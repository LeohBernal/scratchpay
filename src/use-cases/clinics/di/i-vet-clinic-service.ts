import { VetClinic } from '@models/clinics';

abstract class IVetClinicService {
  public abstract findAllVetClinics(): Promise<VetClinic[]>;
}

export { IVetClinicService };
