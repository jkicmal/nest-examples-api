import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default (app: NestExpressApplication): NestExpressApplication => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest Examples')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  return app;
};
