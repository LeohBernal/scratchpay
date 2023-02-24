import { Module } from '@nestjs/common';
import { GetClinicsUseCase } from '@use-cases/clinics';
import { IDentalClinicService, IVetClinicService } from '@use-cases/clinics/di';
import { DentalClinicService, VetClinicService } from '@services/clinics';
import { IGetClinicsUseCase } from './di';
import { ClinicsController } from './clinics-controller';

@Module({
  imports: [],
  controllers: [ClinicsController],
  providers: [
    { provide: IGetClinicsUseCase, useClass: GetClinicsUseCase },
    { provide: IVetClinicService, useClass: VetClinicService },
    { provide: IDentalClinicService, useClass: DentalClinicService },
  ],
})
class ClinicsModule {}

export { ClinicsModule };
