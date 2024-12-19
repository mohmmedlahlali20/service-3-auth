import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP, 
    options: {
      host: 'localhost',
      port: 3, 
    },
  });
  await app.listen();
  console.log('Microservice is listening on port 3');
}
bootstrap();
