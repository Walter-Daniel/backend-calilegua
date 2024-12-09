import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiKeyGuard } from './api-key.guard';

describe('ApiKeyGuard', () => {
  let guard: ApiKeyGuard;
  let reflector: Reflector;
  const mockConfigService = { apiKey: 'validApiKey' };

  beforeEach(() => {
    reflector = {
      get: jest.fn(),
    } as unknown as Reflector;

    guard = new ApiKeyGuard(reflector);
    (guard as any).configService = mockConfigService;
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should allow access to public routes', () => {
    // Mock reflector to return true for public routes
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

  it('should allow access with valid API key', () => {
    // Mock reflector to return false for public routes
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const mockRequest = {
      header: jest.fn().mockReturnValue('validApiKey'),
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    const result = guard.canActivate(mockContext);
    expect(result).toBe(true);
    expect(mockRequest.header).toHaveBeenCalledWith('Auth');
  });

  it('should throw an UnauthorizedException for invalid API key', () => {
    // Mock reflector to return false for public routes
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const mockRequest = {
      header: jest.fn().mockReturnValue('invalidApiKey'),
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrowError('No allow');
    expect(mockRequest.header).toHaveBeenCalledWith('Auth');
  });

  it('should throw an UnauthorizedException if Auth header is missing', () => {
    // Mock reflector to return false for public routes
    jest.spyOn(reflector, 'get').mockReturnValue(false);

    const mockRequest = {
      header: jest.fn().mockReturnValue(undefined),
    };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
      getHandler: jest.fn(),
    } as unknown as ExecutionContext;

    expect(() => guard.canActivate(mockContext)).toThrowError('No allow');
    expect(mockRequest.header).toHaveBeenCalledWith('Auth');
  });
});
