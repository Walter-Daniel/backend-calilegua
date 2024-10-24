import { AppService } from './app.service';
import { Controller, Get } from '@nestjs/common';

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
}
