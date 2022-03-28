import { Test, TestingModule } from '@nestjs/testing';
import { MemoryUserRepository } from 'src/users/database/MemoryUserRepository';
import { CreateUserService } from './create-user.service';

describe('CreateUserService', () => {
  let service: CreateUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserService,
        {
          provide: "USER_REPOSITORY",
          useClass: MemoryUserRepository
        }
      ],
    }).compile();

    service = module.get<CreateUserService>(CreateUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
