import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { Clinic } from './clinic.entity';

class DentalClinic extends Clinic {
  public readonly name: string;
  public readonly state: string;
  public readonly availability: {
    from: string;
    to: string;
  };
  public readonly type = ClinicTypeEnum.DENTAL;

  constructor({ name, state, availability }: { name: string; state: string; availability: { from: string; to: string } }) {
    super({ name, state, availability });
  }
}

export { DentalClinic };
