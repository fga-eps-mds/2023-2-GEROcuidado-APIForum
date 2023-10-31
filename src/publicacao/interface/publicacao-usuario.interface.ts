import { Publicacao } from '../entities/publicacao.entity';

export interface IPublicacaoUsuario extends Publicacao {
  usuario: IUsuario;
}

export interface IUsuario {
  id: number;
  nome: string;
  foto: Buffer;
  email: string;
  senha: string;
  admin: boolean;
}
