export interface UseCase {
	execute(id?: string, data?: any): Promise<any> | void;
}
