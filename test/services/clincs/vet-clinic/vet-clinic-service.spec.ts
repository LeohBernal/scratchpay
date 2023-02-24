import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { StateEnum } from '@enums/state-enum';
import { VetClinic } from '@models/clinics';
import { Test, TestingModule } from '@nestjs/testing';
import { VetClinicService } from '@services/clinics';
import { GetVetClinicsResponse } from '@services/clinics/vet-clinic/interfaces';
import { IVetClinicService } from '@use-cases/clinics/di';
import { executeRequest } from '@utils/request';

jest.mock('@utils/request');
jest.mock('@models/clinics');

describe('VetClinicService', () => {
  let vetClinicService: IVetClinicService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [{ provide: IVetClinicService, useClass: VetClinicService }],
    }).compile();

    vetClinicService = app.get(IVetClinicService);
  });

  it('should be defined', () => {
    expect(vetClinicService).toBeDefined();
  });

  describe('findAllVetClinics', () => {
    it('should execute an external request and return an array of VetClinics', async () => {
      // given
      const getVetClinicsResponseMock = [
        {
          clinicName: 'foo',
          opening: {
            from: '08:00',
            to: '18:00',
          },
          stateCode: 'CA',
        },
        {
          clinicName: 'bar',
          opening: {
            from: '09:00',
            to: '17:00',
          },
          stateCode: 'AK',
        },
      ] as GetVetClinicsResponse;
      const executeRequestSpy = (executeRequest as jest.Mock).mockResolvedValueOnce({ data: getVetClinicsResponseMock });
      const vetClinicSpy = (VetClinic as jest.Mock).mockImplementation(({ name, state, availability }) => ({
        name: name,
        state: state,
        availability: availability,
        type: ClinicTypeEnum.VET,
      }));

      // when
      const response = await vetClinicService.findAllVetClinics();

      // then
      expect(executeRequestSpy).toHaveBeenCalledWith({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json',
        method: 'GET',
      });
      expect(response).toBeInstanceOf(Array);
      expect(response.length).toEqual(getVetClinicsResponseMock.length);
      expect(vetClinicSpy).toHaveBeenNthCalledWith(1, {
        name: getVetClinicsResponseMock[0].clinicName,
        state: StateEnum[getVetClinicsResponseMock[0].stateCode],
        availability: {
          from: getVetClinicsResponseMock[0].opening.from,
          to: getVetClinicsResponseMock[0].opening.to,
        },
      });
      expect(vetClinicSpy).toHaveBeenNthCalledWith(2, {
        name: getVetClinicsResponseMock[1].clinicName,
        state: StateEnum[getVetClinicsResponseMock[1].stateCode],
        availability: {
          from: getVetClinicsResponseMock[1].opening.from,
          to: getVetClinicsResponseMock[1].opening.to,
        },
      });
      expect(response).toEqual([
        {
          name: getVetClinicsResponseMock[0].clinicName,
          state: StateEnum[getVetClinicsResponseMock[0].stateCode],
          availability: {
            from: getVetClinicsResponseMock[0].opening.from,
            to: getVetClinicsResponseMock[0].opening.to,
          },
          type: ClinicTypeEnum.VET,
        },
        {
          name: getVetClinicsResponseMock[1].clinicName,
          state: StateEnum[getVetClinicsResponseMock[1].stateCode],
          availability: {
            from: getVetClinicsResponseMock[1].opening.from,
            to: getVetClinicsResponseMock[1].opening.to,
          },
          type: ClinicTypeEnum.VET,
        },
      ]);
    });
  });
});
