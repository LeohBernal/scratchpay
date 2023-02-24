import { IGetClinicsUseCase } from '@controllers/clinics/di';
import { GetClinicsRequestDTO } from '@controllers/clinics/dtos';
import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { Clinic } from '@models/clinics';
import { Injectable } from '@nestjs/common';
import { isHourGreaterThan, isHourSmallerThan } from '@utils/date';
import { IVetClinicService, IDentalClinicService } from './di';

@Injectable()
class GetClinicsUseCase extends IGetClinicsUseCase {
  constructor(private readonly dentalClinicService: IDentalClinicService, private readonly vetClinicService: IVetClinicService) {
    super();
  }

  public async findClinics(query: GetClinicsRequestDTO): Promise<Clinic[]> {
    const isQueryEmpty = !Object.keys(query).length;
    if (isQueryEmpty) {
      const clinics = await this.executeFindClinicsServices({ shouldExecuteFindDentalClinics: true, shouldExecuteFindVetClinics: true });
      return clinics;
    }

    const clinics = await this.executeFindClinicsServices({
      shouldExecuteFindDentalClinics: !query.type || query.type === ClinicTypeEnum.DENTAL,
      shouldExecuteFindVetClinics: !query.type || query.type === ClinicTypeEnum.VET,
    });

    return this.filterClinics({ clinics, query });
  }

  private async executeFindClinicsServices({
    shouldExecuteFindDentalClinics,
    shouldExecuteFindVetClinics,
  }: {
    shouldExecuteFindDentalClinics: boolean;
    shouldExecuteFindVetClinics: boolean;
  }): Promise<Clinic[]> {
    const promises: Promise<Clinic[]>[] = [];

    if (shouldExecuteFindDentalClinics) {
      promises.push(this.dentalClinicService.findAllDentalClinics());
    }
    if (shouldExecuteFindVetClinics) {
      promises.push(this.vetClinicService.findAllVetClinics());
    }

    const responses = await Promise.all(promises);

    return responses.flat();
  }

  private filterClinics({
    clinics,
    query,
  }: {
    clinics: Clinic[];
    query: {
      name?: string;
      state?: string;
      from?: string;
      to?: string;
    };
  }): Clinic[] {
    if (!query.name && !query.state && !query.from && !query.to) {
      return clinics;
    }

    const filteredClinics = clinics.filter(item => {
      return (
        (!query.name || query.name.toLowerCase() === item.name.toLowerCase()) &&
        (!query.state || query.state.toLowerCase() === item.state.toLowerCase()) &&
        (!query.from || !isHourSmallerThan(query.from, item.availability.from)) &&
        (!query.to || !isHourGreaterThan(query.to, item.availability.to))
      );
    });

    return filteredClinics;
  }
}

export { GetClinicsUseCase };
