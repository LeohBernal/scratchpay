import { Module } from '@nestjs/common';
import { HealthModule } from '@controllers/health';

@Module({
  imports: [HealthModule],
  controllers: [],
  providers: [],
})
class AppModule {}

export { AppModule };
