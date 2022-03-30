import { Controller, Get } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @EventPattern("new-user")
  createUser(@Payload() data) {
    console.log(data.value);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
