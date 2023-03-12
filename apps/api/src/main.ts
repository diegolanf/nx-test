import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import * as functions from 'firebase-functions';

import { AppModule } from './app/app.module';

const server = express();

export const createNestServer = async (
  expressInstance: unknown
): Promise<INestApplication> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance)
  );

  return app.init();
};

createNestServer(server)
  .then((_: INestApplication) => console.info('Nest Ready'))
  .catch((err) => console.error(err));

// Connect express server to Firebase Functions
export const api = functions.https.onRequest(server);
