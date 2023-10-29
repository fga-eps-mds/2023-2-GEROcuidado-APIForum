import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './postagem.controller';
import { PostagemService } from './postagem.service';

@Module({
    imports: [TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemController],
    providers: [PostagemService, Repository],
    exports: [PostagemService],
})
export class PostagemModule { }