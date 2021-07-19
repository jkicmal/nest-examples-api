import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import swaggerBootstrap from './bootstraps/swagger.bootstrap';
import { ConfigService } from './config/config.service';
import { AppModule } from './modules/@app/app.module';
import { WebSocketAdapter } from './shared/adapters/web-socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true, // Allow requests from different origins
  });

  // Apply adapter to existing server
  app.useWebSocketAdapter(new WebSocketAdapter(app));

  // Setup Validation
  app.useGlobalPipes(new ValidationPipe());

  // Setup Swagger
  swaggerBootstrap(app);

  const configService = app.get(ConfigService);
  const logger = new Logger('Server');

  const port = configService.serverPort;
  await app.listen(port, () => logger.log(`Listening on ${port}`));
}
bootstrap();
