import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUserRepository } from '../database/MemoryUserRepository';
import { CreateUserService } from '../services/create-user/create-user.service';

import { UsersGetController } from './get.controller';

describe('UsersGetController', () => {

  let controller: UsersGetController
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersGetController],
      providers: [
        {
          provide: "UserService",
          useClass: CreateUserService
        },
        {
          provide: "USER_REPOSITORY",
          useClass: MemoryUserRepository
        }

      ]

    }).compile();

    controller = module.get<UsersGetController>(UsersGetController);
  });

  it('should be definee', () => {
    expect(controller).toBeDefined()
  })


  describe("create", () => {
    it("should create new user", async () => {
      const user = {
        name: "Teste",
        login: "teste",
        cpf: "11111111111",
        domain: "@mock",
        authenticationType: "mock",
      }
      const result = await controller.create(user);

      expect(result.name).toEqual(user.name)
    })
  })


});
