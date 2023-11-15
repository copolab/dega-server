import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './Users.resolver';
import { Logger } from 'nestjs-pino';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        // Provide a mock or stubbed version of the Logger
        {
          provide: Logger,
          useValue: {
            log: jest.fn(), // You can add other mock methods if needed
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
