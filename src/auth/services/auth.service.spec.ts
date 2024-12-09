import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { OperatorsService } from '../../operators/services/operators.service';
import {
  Operator,
  OperatorRole,
} from '../../operators/entities/operators.entity';

describe('AuthService', () => {
  let service: AuthService;
  let operatorsService: OperatorsService;
  let jwtService: JwtService;

  const mockOperatorsService = {
    findByEmail: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: OperatorsService, useValue: mockOperatorsService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    operatorsService = module.get<OperatorsService>(OperatorsService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateJWT', () => {
    it('should generate a JWT token', async () => {
      const mockOperator: Operator = {
        _id: '1',
        name: 'Prueba',
        lastname: 'Prueba',
        role: OperatorRole.ADMIN,
        email: 'test@example.com',
        password: 'hashedPassword',
      } as Operator;

      const mockToken = 'mockJwtToken';
      mockJwtService.sign.mockReturnValue(mockToken);

      const result = await service.generateJWT(mockOperator);

      expect(result).toEqual({
        access_token: mockToken,
        operator: mockOperator,
      });
      expect(jwtService.sign).toHaveBeenCalledWith({
        role: mockOperator.role,
        sub: mockOperator.id,
      });
    });
  });
});
