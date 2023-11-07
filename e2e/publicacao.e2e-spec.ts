import { Controller, INestApplication, ValidationPipe } from '@nestjs/common';
import {
  ClientProxy,
  ClientsModule,
  MessagePattern,
  Transport,
} from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import request from 'supertest';
import { Repository } from 'typeorm';
import { AppModule } from '../src/app.module';
import { ECategoriaPublicacao } from '../src/publicacao/classes/categoria-publicacao.enum';
import { Publicacao } from '../src/publicacao/entities/publicacao.entity';
import { AllExceptionsFilter } from '../src/shared/filters/all-exceptions.filter';
import { ModelNotFoundExceptionFilter } from '../src/shared/filters/model-not-found.exception-filter';
import { DataTransformInterceptor } from '../src/shared/interceptors/data-transform.interceptor';

@Controller()
class AutenticacaoController {
  @MessagePattern({ role: 'auth', cmd: 'check' })
  async validateToken(data: { jwt: string }) {
    return true;
  }

  @MessagePattern({ role: 'info', cmd: 'get' })
  async findOneTCP(data: { id: number }) {
    return { id: 1 };
  }

  @MessagePattern({ role: 'info', cmd: 'getAll' })
  async findAllTCP(data: { ids: number[] }) {
    return [{ id: 1 }];
  }
}

describe('E2E - Publicacao', () => {
  let app: INestApplication;
  let client: ClientProxy;
  let repository: Repository<Publicacao>;
  let token: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5ceyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  const publicacao: Partial<Publicacao> = {
    id: undefined,
    titulo: 'titulo',
    descricao: 'descricao',
    idUsuario: 1,
    categoria: ECategoriaPublicacao.GERAL,
    dataHora: new Date().toISOString() as any,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ClientsModule.register([
          {
            name: 'USUARIO_CLIENT',
            transport: Transport.TCP,
            options: {
              host: '0.0.0.0',
              port: 8001,
            },
          },
        ]),
      ],
      controllers: [AutenticacaoController],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.useGlobalInterceptors(new DataTransformInterceptor());
    app.useGlobalFilters(
      new AllExceptionsFilter(),
      new ModelNotFoundExceptionFilter(),
    );

    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 8001,
      },
    });

    await app.startAllMicroservices();
    await app.init();

    client = app.get('USUARIO_CLIENT');
    await client.connect();

    repository = app.get<Repository<Publicacao>>(
      getRepositoryToken(Publicacao),
    );
  });

  describe('POST - /api/forum', () => {
    it('should successfully add a new "publicacao"', async () => {
      const res = await request(app.getHttpServer())
        .post('')
        .set('Content-Type', 'application/json')
        .send(publicacao);

      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toEqual('Salvo com sucesso!');
      expect(res.body.data).toMatchObject({
        ...publicacao,
        id: res.body.data.id,
      });

      Object.assign(publicacao, res.body.data);
    });

    it('should not add a new "publicacao" when validations are incorrect', async () => {
      const res = await request(app.getHttpServer())
        .post('')
        .set('Content-Type', 'application/json')
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBeInstanceOf(Array);
      expect(res.body.message).toEqual([
        'idUsuario should not be empty',
        'idUsuario must be a number conforming to the specified constraints',
        'titulo must be shorter than or equal to 100 characters',
        'titulo should not be empty',
        'titulo must be a string',
        'descricao should not be empty',
        'descricao must be shorter than or equal to 500 characters',
        'descricao must be a string',
        'dataHora should not be empty',
        'dataHora must be a valid ISO 8601 date string',
        'categoria must be a valid enum value',
        'categoria should not be empty',
      ]);
      expect(res.body.data).toBeNull();
    });
  });

  describe('GET - /api/forum/:id', () => {
    it('should successfully get "publicacao" by id', async () => {
      const res = await request(app.getHttpServer())
        .get(`/${publicacao.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBeNull();
      const data = res.body.data;
      expect(data).toMatchObject(publicacao);
    });

    it('should return status 400 when id is invalid', async () => {
      const wrongId = 'NaN';
      const res = await request(app.getHttpServer())
        .get(`/${wrongId}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toBeInstanceOf(Array);
      expect(res.body.message).toEqual(['ID inválido']);
      expect(res.body.data).toBeNull();
    });

    it('should return status 404 when no "publicacao" is found', async () => {
      const res = await request(app.getHttpServer())
        .get('/9999')
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toEqual('Registro(s) não encontrado(s)!');
      expect(res.body.data).toBeNull();
    });
  });

  describe('GET - /api/forum/', () => {
    it('should successfully findAll "publicacao" empty', async () => {
      const filter = JSON.stringify({
        isReported: true,
      });

      const res = await request(app.getHttpServer())
        .get('?filter=' + filter)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBeNull();
      expect(res.body.data.length).toEqual(0);
    });

    it('should successfully findAll "publicacao"', async () => {
      const filter = JSON.stringify({
        categoria: publicacao.categoria,
        titulo: publicacao.titulo,
        id: publicacao.id,
      });

      const res = await request(app.getHttpServer())
        .get('?filter=' + filter)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBeNull();
      expect(res.body.data.length).toEqual(1);
    });
  });

  describe('PATCH - /api/forum/:id', () => {
    it('should successfully update "publicacao" by id', async () => {
      const update = { titulo: 'novo titulo' };

      const res = await request(app.getHttpServer())
        .patch(`/${publicacao.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send(update);

      publicacao.titulo = update.titulo;

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Atualizado com sucesso!');
      const data = res.body.data;
      expect(data).toMatchObject(publicacao);
    });
  });

  describe('DELETE - /api/forum/:id', () => {
    it('should successfully delete "publicacao" by id', async () => {
      const res = await request(app.getHttpServer())
        .delete(`/${publicacao.id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', 'bearer ' + token)
        .send();

      delete publicacao.id;

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toBe('Excluído com sucesso!');
      expect(res.body.data).toMatchObject(publicacao);
    });
  });

  afterAll(async () => {
    await repository.query('TRUNCATE publicacao CASCADE');
    await repository.delete({});
    await app.close();
    await client.close();
  });
});
