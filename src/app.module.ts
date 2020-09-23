import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';

@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5444,
    username: 'postgres',
    password: 'postgres',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
