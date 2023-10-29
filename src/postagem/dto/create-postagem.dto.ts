import {
    IsDate,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreatePostagemDto {


    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail()
    emailUsuario!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    titulo!: string;

    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    descricao!: string;

    @IsDate()
    @IsNotEmpty()
    dataHora!: Date;

    @IsString()
    @IsOptional()
    categoria?: string;

    @IsNumber()
    contagemReportes!: number;

}