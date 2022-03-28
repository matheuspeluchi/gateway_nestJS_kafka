import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersGetController } from './controllers/get.controller';
import { UserSchema } from './database/MongoUser.schema';
import { MongoUserRepository } from './database/MongoUserRepository';
import { CreateUserService } from './services/create-user/create-user.service';

@Module({
	imports: [
		MongooseModule.forFeature([{ name: "USER_MODEL", schema: UserSchema }]),
	],
	controllers: [UsersGetController],
	providers: [
		{
			provide: "UserService",
			useClass: CreateUserService
		},
		{
			provide: "USER_REPOSITORY",
			useClass: MongoUserRepository
		}

	]

})
export class UserModule { }
