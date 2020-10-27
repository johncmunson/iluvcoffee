import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesService', () => {
  let module: TestingModule;
  let service: CoffeesService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([Coffee, Flavor]),
      ],
      controllers: [CoffeesController],
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  afterAll(async () => {
    await module.close();
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
