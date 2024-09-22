import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { initializeFirebase } from './firebase/firebase.config';

dotenv.config();

async function bootstrap() {

  initializeFirebase();

  const app = await NestFactory.create(AppModule);
  await app.listen(4000);
}
bootstrap();
