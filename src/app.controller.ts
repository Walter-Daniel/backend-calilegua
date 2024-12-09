import { AppService } from './app.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getApiKey(): string {
    return this.appService.getApiKey();
  }

  @Public()
  @Get('probando')
  probando(): string {
    return 'Probando...';
  }

  @Get('nuevo')
  publica(): string {
    return 'Hola mundo';
  }
}
