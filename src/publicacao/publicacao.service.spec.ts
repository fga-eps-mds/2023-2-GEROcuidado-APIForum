import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { Repository } from 'typeorm';
import { OrderParams, Ordering } from '../shared/decorators/ordenate.decorator';
import {
  Pagination,
  PaginationParams,
} from '../shared/decorators/paginate.decorator';
import { Publicacao } from './entities/publicacao.entity';
import { PublicacaoService } from './publicacao.service';

describe('PublicacaoService', () => {
  let service: PublicacaoService;
  let repository: Repository<Publicacao>;
  let clientProxy: ClientProxy;

  const mockRepository = {
    save: jest.fn(),
    findOneOrFail: jest.fn(),
    remove: jest.fn(),
    findOne: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      offset: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      getManyAndCount: jest.fn(),
    })),
  };

  const mockClientProxy = {
    send: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Publicacao),
          useValue: mockRepository,
        },
        PublicacaoService,
        {
          provide: 'USUARIO_CLIENT',
          useValue: mockClientProxy,
        },
      ],
    }).compile();

    service = module.get<PublicacaoService>(PublicacaoService);
    clientProxy = module.get<ClientProxy>('USUARIO_CLIENT');
    repository = module.get<Repository<Publicacao>>(
      getRepositoryToken(Publicacao),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create Publicacao', async () => {
    const publi = { titulo: 'titulo' } as any;
    jest.spyOn(repository, 'save').mockReturnValue({ id: 1 } as any);
    const created = await service.create(publi);
    expect(created.id).toEqual(1);
  });

  it('should find Publicacao', async () => {
    jest.spyOn(repository, 'findOneOrFail').mockReturnValue({ id: 1 } as any);
    jest.spyOn(clientProxy, 'send').mockReturnValue(of({ id: 1 }) as any);

    const found = await service.findOne(1);
    expect(found.id).toEqual(1);
  });

  it('should remove Publicacao', async () => {
    jest.spyOn(repository, 'findOneOrFail').mockReturnValue({ id: 1 } as any);
    jest.spyOn(repository, 'remove').mockReturnValue({ id: 1 } as any);

    const removed = await service.remove(1);
    expect(removed.id).toEqual(1);
  });

  it('should update Publicacao', async () => {
    jest.spyOn(clientProxy, 'send').mockReturnValue(of({ id: 1 }) as any);
    jest.spyOn(repository, 'findOneOrFail').mockReturnValue({ id: 1 } as any);
    jest
      .spyOn(repository, 'save')
      .mockReturnValue({ id: 1, titulo: 'titulo 2' } as any);

    const found = await service.update(1, { titulo: 'titulo 2' });
    expect(found).toEqual({ id: 1, titulo: 'titulo 2' });
  });

  describe('findAll', () => {
    const publicacao = {
      id: 1,
      titulo: 'título',
      descricao: 'descricao',
    };

    const order: OrderParams = {
      column: 'id',
      dir: 'ASC',
    };
    const ordering: Ordering = new Ordering(JSON.stringify(order));

    const paginate: PaginationParams = {
      limit: 10,
      offset: 0,
    };
    const pagination: Pagination = new Pagination(paginate);

    it('should findAll Publicacao', async () => {
      jest.spyOn(clientProxy, 'send').mockReturnValue(of([{ id: 1 }]) as any);
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        where: () => ({
          limit: () => ({
            offset: () => ({
              orderBy: () => ({
                getManyAndCount: jest
                  .fn()
                  .mockResolvedValueOnce([[publicacao], 1]),
              }),
            }),
          }),
        }),
      } as any);

      const { data, count } = await service.findAll({}, ordering, pagination);
      expect(count).toEqual(1);
      expect(data[0]).toEqual(publicacao);
    });

    it('should findAll Publicacao with isReported', async () => {
      jest.spyOn(clientProxy, 'send').mockReturnValue(of([{ id: 1 }]) as any);
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        where: () => ({
          limit: () => ({
            offset: () => ({
              orderBy: () => ({
                getManyAndCount: jest
                  .fn()
                  .mockResolvedValueOnce([[publicacao], 1]),
              }),
            }),
          }),
        }),
      } as any);

      const { data, count } = await service.findAll(
        { isReported: true },
        ordering,
        pagination,
      );
      expect(count).toEqual(1);
      expect(data[0]).toEqual(publicacao);
    });

    it('should findAll Publicacao with title unaccent', async () => {
      jest.spyOn(clientProxy, 'send').mockReturnValue(of([{ id: 1 }]) as any);
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValue({
        where: () => ({
          limit: () => ({
            offset: () => ({
              orderBy: () => ({
                getManyAndCount: jest
                  .fn()
                  .mockResolvedValueOnce([[publicacao], 1]),
              }),
            }),
          }),
        }),
      } as any);

      const { data, count } = await service.findAll(
        { titulo: "titulo" },
        ordering,
        pagination,
      );
      expect(count).toEqual(1);
      expect(data[0]).toEqual(publicacao);
    });
  });
});
