import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './categories/categories.module';
import { MealsModule } from './meals/meals.module';
import { FirestoreModule } from './firestore/firestore.module';

@Module({
  imports: [CategoryModule, MealsModule, FirestoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
