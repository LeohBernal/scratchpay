import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { DentalClinic } from '@models/clinics';
import { Test, TestingModule } from '@nestjs/testing';
import { DentalClinicService } from '@services/clinics';
import { GetDentalClinicsResponse } from '@services/clinics/dental-clinic/interfaces';
import { IDentalClinicService } from '@use-cases/clinics/di';
import { executeRequest } from '@utils/request';

jest.mock('@utils/request');
jest.mock('@models/clinics');

describe('DentalClinicService', () => {
  let dentalClinicService: IDentalClinicService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [{ provide: IDentalClinicService, useClass: DentalClinicService }],
    }).compile();

    dentalClinicService = app.get(IDentalClinicService);
  });

  it('should be defined', () => {
    expect(dentalClinicService).toBeDefined();
  });

  describe('findAllDentalClinics', () => {
    it('should execute an external request and return an array of DentalClinics', async () => {
      // given
      const getDentalClinicsResponseMock = [
        {
          name: 'foo',
          availability: {
            from: '08:00',
            to: '18:00',
          },
          stateName: 'California',
        },
        {
          name: 'bar',
          availability: {
            from: '09:00',
            to: '17:00',
          },
          stateName: 'Alaska',
        },
      ] as GetDentalClinicsResponse;
      const executeRequestSpy = (executeRequest as jest.Mock).mockResolvedValueOnce({ data: getDentalClinicsResponseMock });
      const dentalClinicSpy = (DentalClinic as jest.Mock).mockImplementation(({ name, state, availability }) => ({
        name,
        state,
        availability,
        type: ClinicTypeEnum.DENTAL,
      }));

      // when
      const response = await dentalClinicService.findAllDentalClinics();

      // then
      expect(executeRequestSpy).toHaveBeenCalledWith({
        url: 'https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json',
        method: 'GET',
      });
      expect(response).toBeInstanceOf(Array);
      expect(response.length).toEqual(getDentalClinicsResponseMock.length);
      expect(dentalClinicSpy).toHaveBeenNthCalledWith(1, {
        name: getDentalClinicsResponseMock[0].name,
        state: getDentalClinicsResponseMock[0].stateName,
        availability: {
          from: getDentalClinicsResponseMock[0].availability.from,
          to: getDentalClinicsResponseMock[0].availability.to,
        },
      });
      expect(dentalClinicSpy).toHaveBeenNthCalledWith(2, {
        name: getDentalClinicsResponseMock[1].name,
        state: getDentalClinicsResponseMock[1].stateName,
        availability: {
          from: getDentalClinicsResponseMock[1].availability.from,
          to: getDentalClinicsResponseMock[1].availability.to,
        },
      });
      expect(response).toEqual([
        {
          name: getDentalClinicsResponseMock[0].name,
          state: getDentalClinicsResponseMock[0].stateName,
          availability: {
            from: getDentalClinicsResponseMock[0].availability.from,
            to: getDentalClinicsResponseMock[0].availability.to,
          },
          type: ClinicTypeEnum.DENTAL,
        },
        {
          name: getDentalClinicsResponseMock[1].name,
          state: getDentalClinicsResponseMock[1].stateName,
          availability: {
            from: getDentalClinicsResponseMock[1].availability.from,
            to: getDentalClinicsResponseMock[1].availability.to,
          },
          type: ClinicTypeEnum.DENTAL,
        },
      ]);
    });
  });
});
