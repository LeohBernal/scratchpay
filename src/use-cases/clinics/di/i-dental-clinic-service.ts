import { DentalClinic } from '@models/clinics';

abstract class IDentalClinicService {
  public abstract findAllDentalClinics(): Promise<DentalClinic[]>;
}

export { IDentalClinicService };
