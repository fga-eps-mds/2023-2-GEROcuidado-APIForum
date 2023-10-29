import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostagemDto } from "./dto/create-postagem.dto";
import { Postagem } from "./entities/postagem.entity";


@Injectable()
export class PostagemService {
    constructor(
        @InjectRepository(Postagem)
        private readonly _repository: Repository<Postagem>,
        //private readonly _configService: ConfigService,
    ) { }

    async create(body: CreatePostagemDto): Promise<Postagem> {
        const postagem = new Postagem(body);
        return this._repository.save(postagem);
    }

}