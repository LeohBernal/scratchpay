import { IDentalClinicService } from '@use-cases/clinics/di';
import { DentalClinic } from '@models/clinics';
import { executeRequest } from '@utils/request';
import { GetDentalClinicsResponse } from './interfaces';
import { RequestTypeEnum } from '@enums/request-type-enum';
import { Injectable } from '@nestjs/common';

@Injectable()
class DentalClinicService extends IDentalClinicService {
  public async findAllDentalClinics(): Promise<DentalClinic[]> {
    const { data } = await executeRequest<GetDentalClinicsResponse>({
      url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
      method: RequestTypeEnum.GET,
    });

    return this.formatFindAllDentalClinicsResponse(data);
  }

  private formatFindAllDentalClinicsResponse(data: GetDentalClinicsResponse): DentalClinic[] {
    return data.map(({ name, stateName, availability }) => {
      return new DentalClinic({
        name: name,
        state: stateName,
        availability: {
          from: availability.from,
          to: availability.to,
        },
      });
    });
  }
}

export { DentalClinicService };
