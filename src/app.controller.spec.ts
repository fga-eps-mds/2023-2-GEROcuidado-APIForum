import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controler';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should make health check', () => {
    expect(controller.heathCheck()).toEqual({
      message: 'GEROcuidadoAPIForum health check Ok!',
      data: {},
    });
  });
});
