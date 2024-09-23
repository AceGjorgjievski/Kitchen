import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { initializeFirebase } from './firebase/firebase.config';
import {ValidationPipe} from "@nestjs/common";

dotenv.config();

async function bootstrap() {

  initializeFirebase();

  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(4000);
}
bootstrap();
