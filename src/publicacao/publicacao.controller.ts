import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { HttpResponse } from '../shared/classes/http-response';
import { PublicRoute } from '../shared/decorators/public-route.decorator';
import { IdValidator } from '../shared/validators/id.validator';
import { CreatePublicacaoDto } from './dto/create-publicacao.dto';
import { UpdatePublicacaoDto } from './dto/update-publicacao.dto';
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

  @Get(':id')
  async findOne(@Param() param: IdValidator): Promise<Publicacao> {
    return this._service.findOne(param.id);
  }

  @Patch(':id')
  async update(
    @Param() param: IdValidator,
    @Body() body: UpdatePublicacaoDto,
  ): Promise<Response<Publicacao>> {
    const updated = await this._service.update(param.id, body);
    return new HttpResponse<Publicacao>(updated).onUpdated();
  }

  @Post()
  async create(@Body() body: CreatePublicacaoDto) {
    const created = await this._service.create(body);
    return new HttpResponse<Publicacao>(created).onCreated();
  }

  // Criar uma rota para remover uma Publicacao

  // Criar uma rota para editar uma Publicacao
}
