import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { ECategoriaPublicacao } from '../classes/categoria-publicacao.enum';

export class CreatePublicacaoDto {
  @IsNumber()
  @IsNotEmpty()
  idUsuario!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  titulo!: string;

  @IsString()
  @MaxLength(500)
  @IsNotEmpty()
  descricao!: string;

  @IsDateString()
  @IsNotEmpty()
  dataHora!: Date;

  @IsNotEmpty()
  @IsEnum(ECategoriaPublicacao)
  categoria!: ECategoriaPublicacao;

  @IsNumber()
  contagemReportes!: number;
}
