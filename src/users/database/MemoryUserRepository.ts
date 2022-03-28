import { Injectable } from "@nestjs/common";
import { User } from "../User";
import { UserRepositoty } from "../UserRepository";

@Injectable()
export class MemoryUserRepository implements UserRepositoty {

	private users: User[] = []

	async save(user) {
		this.users.push(user)
		return user;
	}

	async findByLogin(login: string): Promise<User> {
		return this.users.filter(item => item.login === login)[0] || null
	}
}