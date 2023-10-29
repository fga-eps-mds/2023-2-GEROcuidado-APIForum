import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicacaoDto } from './create-publicacao.dto';

export class UpdatePublicacaoDto extends PartialType(CreatePublicacaoDto) {}
