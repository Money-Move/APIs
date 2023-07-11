import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { contentParser } from 'fastify-multer';
import helmet from 'fastify-helmet';
import { AppModule } from './app.module';
import { join } from 'path';
import { configuration, formatErrors } from './common';
import { useContainer } from 'class-validator';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

export const createApplication = async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { exposeDefaultValues: true },
      exceptionFactory: (errors: ValidationError[]) => {
        throw new BadRequestException(formatErrors(errors));
      },
    }),
  );

  app.register(helmet, {
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  app.register(contentParser); // eslint-disable-line no-alert

  app.useStaticAssets({
    root: join(process.cwd(), configuration().uploadDir),
  });

  app.enableCors();

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.enableShutdownHooks();

  return app;
};
