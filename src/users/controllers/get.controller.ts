import { Body, Controller, Inject, Post } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { KafkaMessage } from "@nestjs/microservices/external/kafka.interface";
import { Types } from 'mongoose';
import { CreateUserService } from "../services/create-user/create-user.service";
import { UserService } from "./UserService";

function nextId() {
	return new Types.ObjectId().toHexString();
}

@Controller("users")
export class UsersGetController {
	constructor(
		@Inject("UserService") private readonly service: UserService
	) { }

	@MessagePattern('create-user')
	createUser(@Payload() message: KafkaMessage): void {
		//this.service.execute(nextId(), JSON.parse(message.value.toString()))
		console.log(message.value);

	}

	@Post()
	async create(@Body() user: any) {
		return (await this.service.execute(nextId(), user)).toJson();

	}

}
