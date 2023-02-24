import { Module } from '@nestjs/common';
import { HealthModule } from '@controllers/health';
import { ClinicsModule } from '@controllers/clinics';

@Module({
  imports: [HealthModule, ClinicsModule],
  controllers: [],
  providers: [],
})
class AppModule {}

export { AppModule };
