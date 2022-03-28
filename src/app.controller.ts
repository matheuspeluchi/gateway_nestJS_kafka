import { Controller, Get, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AzureEventConsumer } from './infra/azure/AzureEventConsumer';

@Controller()
export class AppController implements OnModuleInit {
  constructor(private readonly appService: AppService) { }

  onModuleInit() {
    const consumer = new AzureEventConsumer("new-user")
    consumer.subscription()

  }

  @EventPattern("new-user")
  createUser(data) {
    console.log(data);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
