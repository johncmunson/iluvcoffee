import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// TO-DO: https://docs.nestjs.com/techniques/configuration

const dbConfig: TypeOrmModuleOptions =
  process.env.NODE_ENV === 'test'
    ? {
        type: 'sqlite',
        database: ':memory:',
        dropSchema: true,
        // Use this instead of manually maintaining an `entities` array.
        autoLoadEntities: true,
        // Wipes the database before each test and recreates the schemas.
        synchronize: true,
        // Only needed in tests. Reuses the connection pool instead of tearing it down.
        keepConnectionAlive: true,
      }
    : process.env.NODE_ENV === 'dev'
    ? {
        type: 'postgres',
        host: 'localhost',
        port: 5555,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
      }
    : // Default to 'prod'
      {
        type: 'postgres',
        host: 'localhost',
        port: 5555,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        autoLoadEntities: true,
      };

const typeOrmRootModule = TypeOrmModule.forRoot(dbConfig);

@Module({
  imports: [typeOrmRootModule],
  // Mike exports his, but it doesn't seem to be necessary
  // exports: [typeOrmRootModule],
})
export class DatabaseModule {}
