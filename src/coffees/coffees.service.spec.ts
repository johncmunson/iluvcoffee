import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
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
      imports: [DatabaseModule, TypeOrmModule.forFeature([Coffee, Flavor])],
      controllers: [CoffeesController],
      providers: [CoffeesService],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  afterAll(async () => {
    await module.close();
    // these two lines maybe not necessary since
    // we're using an in-memory database for tests
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('creates coffees and upserts flavors', async () => {
      const coffee = await service.create({
        name: 'Sludge',
        brand: 'Death Wish',
        flavors: ['Petrol', 'Gasoline'],
      });

      expect(coffee).toEqual({
        id: 1,
        name: 'Sludge',
        brand: 'Death Wish',
        flavors: [
          { name: 'Petrol', id: 1 },
          { name: 'Gasoline', id: 2 },
        ],
      });
    });
  });
});
