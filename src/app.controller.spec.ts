import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const mockMongoDb = {
      collection: jest.fn().mockReturnValue({
        find: jest.fn().mockReturnValue({
          toArray: jest.fn().mockResolvedValue([
            { _id: '1', name: 'Usuario Prueba 1' },
            { _id: '2', name: 'Usuario Prueba 2' },
          ]),
        }),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'MONGO',
          useValue: mockMongoDb, // Mock del cliente MongoDB
        },
        {
          provide: config.KEY,
          useValue: {
            apiKey: '123456',
            database: {
              name: 'test-db',
              port: 27017,
            },
          },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('getApiKey', () => {
    it('should return "La llave de la aplicación es: APIKEY"', () => {
      expect(appController.getApiKey()).toBe(
        'La llave de la aplicación es: 123456',
      );
    });
  });

  describe('probando', () => {
    it('should return "Probando..." from probando()', () => {
      expect(appController.probando()).toBe('Probando...');
    });
  });

  describe('publica', () => {
    it('should return "Hola mundo" from publica()', () => {
      expect(appController.publica()).toBe('Hola mundo');
    });
  });
});
