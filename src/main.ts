import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Cho phép frontend gọi qua HTTPS
  app.enableCors({
    origin: '*',
  });

  // ✅ Railway cấp PORT ngẫu nhiên
  const port = process.env.PORT || 8080;
  await app.listen(port);
  console.log(`Server is running on port ${port}`);
}
bootstrap();
