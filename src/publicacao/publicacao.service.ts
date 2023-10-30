import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublicacaoDto } from './dto/create-publicacao.dto';
import { UpdatePublicacaoDto } from './dto/update-publicacao.dto';
import { Publicacao } from './entities/publicacao.entity';

@Injectable()
export class PublicacaoService {
  constructor(
    @InjectRepository(Publicacao)
    private readonly _repository: Repository<Publicacao>, //private readonly _configService: ConfigService,
  ) {}

  async create(body: CreatePublicacaoDto): Promise<Publicacao> {
    const publicacao = new Publicacao(body);
    return this._repository.save(publicacao);
  }

  async findOne(id: number) {
    const publicacao = await this._repository.findOneOrFail({ where: { id } });
    return publicacao;
  }
  async update(id: number, body: UpdatePublicacaoDto): Promise<Publicacao> {}
}
