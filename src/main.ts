import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: '*' });

  // ✅ Railway cung cấp PORT qua biến môi trường
  const port = process.env.PORT ? Number(process.env.PORT) : 8080;

  await app.listen(port, '0.0.0.0');
  console.log(`✅ Server is running on http://0.0.0.0:${port}`);
  console.log('ENV PORT =', process.env.PORT);
}
bootstrap();