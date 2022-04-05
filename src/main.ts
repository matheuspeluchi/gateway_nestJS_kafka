import { Options, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { InvalidFormException } from './common/exceptions/invalid.form.exception';
import { Message } from './common/exceptions/Message';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'api_gateway',
        brokers: [process.env.AZURE_BROKERS],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: '$ConnectionString',
          password: process.env.AZURE_ENDPOINT,
        },
      },
      consumer: {
        groupId: 'gateway',
      },
    },
  });

  // await app.startAllMicroservices();

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new InvalidFormException(errors),
    }),
  );
  await app.listen(3000);
}
bootstrap();
