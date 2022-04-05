import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

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

  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
