import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, CoffeesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
