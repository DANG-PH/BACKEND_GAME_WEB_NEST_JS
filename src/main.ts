import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // Parse JSON với UTF-8
  app.use(bodyParser.json({ limit: '10mb', type: 'application/json' }));

  // ✅ Railway cung cấp PORT qua biến môi trường
  const port = process.env.PORT ? Number(process.env.PORT) : 8081;

  await app.listen(port);
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
  console.log('ENV PORT =', process.env.PORT);
}
bootstrap();