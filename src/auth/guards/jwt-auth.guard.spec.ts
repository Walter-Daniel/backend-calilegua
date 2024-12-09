import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as unknown as Reflector;

    guard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  // El mock del reflector tiene que retornar 'true' si la ruta es pública

  it('should allow access to public routes', () => {
    jest.spyOn(reflector, 'get').mockReturnValue(true);

    const mockContext = {
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(reflector.get).toHaveBeenCalledWith(
      'isPublic',
      mockContext.getHandler(),
    );
  });
});
