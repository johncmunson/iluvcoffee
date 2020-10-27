import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { DatabaseModule } from '../database/database.module';

describe('CoffeesController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, TypeOrmModule.forFeature([Coffee, Flavor])],
      controllers: [CoffeesController],
      providers: [CoffeesService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    // these two lines maybe not necessary since
    // we're using an in-memory database for tests
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('POST /coffees', () => {
    it('creates coffees', () => {
      return request(app.getHttpServer())
        .post('/coffees')
        .send({ name: 'abc', brand: 'xyz', flavors: ['q', 'r', 's'] })
        .expect(201)
        .expect({
          id: 1,
          name: 'abc',
          brand: 'xyz',
          flavors: [
            { id: 1, name: 'q' },
            { id: 2, name: 'r' },
            { id: 3, name: 's' },
          ],
        });
    });
  })
});
