import { User } from "./User";

export const USER_REPOSITORY = 'USER_REPOSITORY'

export interface UserRepositoty {

	save(user: User): Promise<User>
	findByLogin(login: string): Promise<User>

}