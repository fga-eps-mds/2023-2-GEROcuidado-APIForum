import { ECategoriaPublicacao } from '../classes/categoria-publicacao.enum';

export interface IPublicacaoFilter {
  id?: number;
  titulo?: string;
  categoria?: ECategoriaPublicacao;
  isReported?: boolean;
}
