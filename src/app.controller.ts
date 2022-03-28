import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  /**
   * A hello message!
   * @returns just a short message, you're not meant to be here
   */
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
