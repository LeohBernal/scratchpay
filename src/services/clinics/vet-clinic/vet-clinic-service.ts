import { IVetClinicService } from '@use-cases/clinics/di';
import { VetClinic } from '@models/clinics';
import { executeRequest } from '@utils/request';
import { GetVetClinicsResponse } from './interfaces';
import { StateEnum } from '@enums/state-enum';
import { RequestTypeEnum } from '@enums/request-type-enum';
import { Injectable } from '@nestjs/common';

@Injectable()
class VetClinicService extends IVetClinicService {
  public async findAllVetClinics(): Promise<VetClinic[]> {
    const { data } = await executeRequest<GetVetClinicsResponse>({
      url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
      method: RequestTypeEnum.GET,
    });

    return this.formatFindAllVetClinicsResponse(data);
  }

  private formatFindAllVetClinicsResponse(data: GetVetClinicsResponse): VetClinic[] {
    return data.map(({ clinicName, stateCode, opening }) => {
      return new VetClinic({
        name: clinicName,
        state: StateEnum[stateCode],
        availability: {
          from: opening.from,
          to: opening.to,
        },
      });
    });
  }
}

export { VetClinicService };
