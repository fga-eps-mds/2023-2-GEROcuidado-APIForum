import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacao } from './entities/publicacao.entity';
import { PublicacaoController } from './publicacao.controller';
import { PublicacaoService } from './publicacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([Publicacao])],
  controllers: [PublicacaoController],
  providers: [PublicacaoService, Repository],
  exports: [PublicacaoService],
})
export class PublicacaoModule {}
