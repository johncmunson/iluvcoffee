import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

describe('CoffeesController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          autoLoadEntities: true,
          synchronize: true,
          keepConnectionAlive: true,

          // type: 'postgres',
          // host: 'localhost',
          // port: 5444,
          // username: 'postgres',
          // password: 'postgres',
          // database: 'postgres',
          // // Use this instead of manually maintaining an `entities` array.
          // autoLoadEntities: true,
          // // Wipes the database before each test and recreates the schemas.
          // synchronize: true,
          // // Only needed in tests. Reuses the connection pool instead of tearing it down.
          // keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([Coffee, Flavor]),
      ],
      controllers: [CoffeesController],
      providers: [CoffeesService],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    // these two lines maybe not necessary?
    await getConnection().dropDatabase();
    await getConnection().close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('creates coffees', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send({ name: 'abc', brand: 'xyz', flavors: ['q', 'r', 's'] })
      .expect(201)
      .expect({
        data: { name: 'abc', brand: 'xyz', flavors: ['q', 'r', 's'] },
      });
  })
});
