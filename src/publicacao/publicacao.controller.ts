import { Body, Controller, Get, Post } from '@nestjs/common';
import { HttpResponse } from '../shared/classes/http-response';
import { PublicRoute } from '../shared/decorators/public-route.decorator';
import { CreatePublicacaoDto } from './dto/create-publicacao.dto';
import { Publicacao } from './entities/publicacao.entity';
import { PublicacaoService } from './publicacao.service';

@Controller()
export class PublicacaoController {
  constructor(private readonly _service: PublicacaoService) {}

  @Get()
  @PublicRoute()
  findAll() {
    return 'Aqui deveriamos retornar uma funcao do service ';
  }

  @Post()
  async create(@Body() body: CreatePublicacaoDto) {
    const created = await this._service.create(body);
    return new HttpResponse<Publicacao>(created).onCreated();
  }

  // Criar uma rota para criar uma Publicacao

  // Criar uma rota para remover uma Publicacao

  // Criar uma rota para editar uma Publicacao
}
