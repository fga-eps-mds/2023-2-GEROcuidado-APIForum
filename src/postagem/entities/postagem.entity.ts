import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreatePostagemDto } from '../dto/create-postagem.dto';

@Entity({ name: 'postagem' })
export class Postagem {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column('varchar', { length: 100, unique: true })
    emailUsuario!: string;

    @Column('varchar', { length: 100 })
    titulo!: string;

    @Column('varchar', { length: 100 })
    descricao!: string;

    @Column('timestamp')
    dataHora!: Date;

    @Column('enum', { nullable: true })
    categoria!: string;

    @Column('integer')
    contagemReportes!: number;

    constructor(createPostagemDto: CreatePostagemDto) {
        Object.assign(this, createPostagemDto);
    }

}