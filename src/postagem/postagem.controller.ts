import { Controller, Get } from '@nestjs/common';


@Controller()
export class PostagemController {
    @Get()
    findAll() {
        return 'Aqui deveriamos retornar uma funcao do service ';
    }

    // Criar uma rota para criar uma postagem

    // Criar uma rota para remover uma postagem

    // Criar uma rota para editar uma postagem
}