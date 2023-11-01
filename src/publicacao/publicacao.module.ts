import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publicacao } from './entities/publicacao.entity';
import { PublicacaoController } from './publicacao.controller';
import { PublicacaoService } from './publicacao.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publicacao]),
    ClientsModule.registerAsync([
      {
        name: 'USUARIO_CLIENT',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [PublicacaoController],
  providers: [PublicacaoService, Repository],
  exports: [PublicacaoService],
})
export class PublicacaoModule {}
