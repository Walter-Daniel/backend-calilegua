import { AppService } from './app.service';
import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
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
  @Get('tasks')
  tasks() {
    return this.appService.getTasks();
  }

  @Public()
  @Get('probando')
  probando(): string {
    return 'Probando...';
  }

  @SetMetadata('isPublic', true)
  @Get('nuevo')
  publica(): string {
    return 'Holaaaaa';
  }
}
