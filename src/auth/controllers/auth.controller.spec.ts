import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import {
  Operator,
  OperatorRole,
} from '../../operators/entities/operators.entity';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    generateJWT: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return JWT token and operator', async () => {
      const mockOperator: Operator = {
        id: '1',
        email: 'test@example.com',
        role: OperatorRole.ADMIN,
        password: 'hashedPassword',
      } as Operator;
      const mockRequest = {
        user: mockOperator,
      };
      const mockResponse = {
        access_token: 'mockJwtToken',
        operator: mockOperator,
      };
      mockAuthService.generateJWT.mockResolvedValue(mockResponse);

      const result = await controller.login(mockRequest as any);

      expect(result).toEqual(mockResponse);
      expect(authService.generateJWT).toHaveBeenCalledWith(mockOperator);
    });
  });
});
