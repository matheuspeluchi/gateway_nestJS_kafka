export const USER_SERVICE = "USER_SERVICE"

export interface UserService {
	execute(id?, data?: any): Promise<void> | Promise<any> | void
}