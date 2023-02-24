import { GetClinicsRequestDTO } from '@controllers/clinics/dtos';
import { Clinic } from '@models/clinics';

abstract class IGetClinicsUseCase {
  public abstract findClinics(query: GetClinicsRequestDTO): Promise<Clinic[]>;
}

export { IGetClinicsUseCase };
