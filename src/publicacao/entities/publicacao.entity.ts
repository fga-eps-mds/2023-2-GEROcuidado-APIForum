import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ECategoriaPublicacao } from '../classes/categoria-publicacao.enum';
import { CreatePublicacaoDto } from '../dto/create-publicacao.dto';
import { UpdatePublicacaoDto } from '../dto/update-publicacao.dto';

@Entity({ name: 'publicacao' })
export class Publicacao {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('integer')
  idUsuario!: number;

  @Column('varchar', { length: 100 })
  titulo!: string;

  @Column('varchar', { length: 500 })
  descricao!: string;

  @Column('timestamp')
  dataHora!: Date;

  @Column('enum', {
    enum: ECategoriaPublicacao,
    default: ECategoriaPublicacao.GERAL,
  })
  categoria!: ECategoriaPublicacao;

  @Column('integer', { array: true, default: [] })
  idUsuarioReporte!: number[];

  constructor(createPublicacaoDto: CreatePublicacaoDto | UpdatePublicacaoDto) {
    Object.assign(this, createPublicacaoDto);
  }
}
