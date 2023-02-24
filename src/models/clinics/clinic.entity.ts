import { ClinicTypeEnum } from '@enums/clinic-type-enum';

abstract class Clinic {
  public readonly name: string;
  public readonly state: string;
  public readonly availability: {
    from: string;
    to: string;
  };
  public abstract readonly type: ClinicTypeEnum;

  constructor({ name, state, availability }: { name: string; state: string; availability: { from: string; to: string } }) {
    this.name = name;
    this.state = state;
    this.availability = availability;
  }
}

export { Clinic };
