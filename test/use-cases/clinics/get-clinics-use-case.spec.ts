import { IGetClinicsUseCase } from '@controllers/clinics/di';
import { GetClinicsRequestDTO } from '@controllers/clinics/dtos';
import { ClinicTypeEnum } from '@enums/clinic-type-enum';
import { DentalClinic, VetClinic } from '@models/clinics';
import { Test, TestingModule } from '@nestjs/testing';
import { GetDentalClinicsResponse } from '@services/clinics/dental-clinic/interfaces';
import { GetClinicsUseCase } from '@use-cases/clinics';
import { IDentalClinicService, IVetClinicService } from '@use-cases/clinics/di';
import { executeRequest } from '@utils/request';

describe('GetClinicsUseCase', () => {
  let getClinicsUseCase: IGetClinicsUseCase;
  let dentalClinicService: IDentalClinicService;
  let vetClinicService: IVetClinicService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [
        { provide: IGetClinicsUseCase, useClass: GetClinicsUseCase },
        { provide: IDentalClinicService, useValue: { findAllDentalClinics: jest.fn() } },
        { provide: IVetClinicService, useValue: { findAllVetClinics: jest.fn() } },
      ],
    }).compile();

    getClinicsUseCase = app.get(IGetClinicsUseCase);
    dentalClinicService = app.get(IDentalClinicService);
    vetClinicService = app.get(IVetClinicService);
  });

  it('should be defined', () => {
    expect(getClinicsUseCase).toBeDefined();
  });

  describe('findClinics', () => {
    it('should execute findAllDentalClinics and findAllVetClinics services and return an array containing all Clinics when the query is empty', async () => {
      // given
      const query = {} as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [{ type: ClinicTypeEnum.DENTAL }] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [{ type: ClinicTypeEnum.VET }] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([...findAllDentalClinicsMock, ...findAllVetClinicsMock]);
    });

    it('should execute only findAllDentalClinics service and return an array containing DentalClinics when the query.type is equal to DENTAL', async () => {
      // given
      const query = {
        type: ClinicTypeEnum.DENTAL,
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [{ type: ClinicTypeEnum.DENTAL }] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [{ type: ClinicTypeEnum.VET }] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(0);
      expect(response).toEqual(findAllDentalClinicsMock);
    });

    it('should execute only findAllVetClinics service and return an array containing VetClinics when the query.type is equal to VET', async () => {
      // given
      const query = {
        type: ClinicTypeEnum.VET,
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [{ type: ClinicTypeEnum.DENTAL }] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [{ type: ClinicTypeEnum.VET }] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(0);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual(findAllVetClinicsMock);
    });

    it('should return only clinics with the name equal to query.name', async () => {
      // given
      const query = {
        name: 'Filter name',
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [
        { type: ClinicTypeEnum.DENTAL, name: 'FILTER NAME' },
        { type: ClinicTypeEnum.DENTAL, name: 'RANDOM NAME' },
      ] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [
        { type: ClinicTypeEnum.VET, name: 'random name' },
        { type: ClinicTypeEnum.VET, name: 'filter name' },
      ] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([findAllDentalClinicsMock[0], findAllVetClinicsMock[1]]);
    });

    it('should return only clinics with the state equal to query.state', async () => {
      // given
      const query = {
        state: 'filter state',
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [
        { type: ClinicTypeEnum.DENTAL, state: 'RANDOM STATE' },
        { type: ClinicTypeEnum.DENTAL, state: 'FILTER STATE' },
      ] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [
        { type: ClinicTypeEnum.VET, state: 'filter state' },
        { type: ClinicTypeEnum.VET, state: 'random state' },
      ] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([findAllDentalClinicsMock[1], findAllVetClinicsMock[0]]);
    });

    it('should return only clinics with the availability.from smaller or equal to query.from', async () => {
      // given
      const query = {
        from: '09:00',
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [
        { type: ClinicTypeEnum.DENTAL, availability: { from: '08:00' } },
        { type: ClinicTypeEnum.DENTAL, availability: { from: '07:00' } },
      ] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [
        { type: ClinicTypeEnum.VET, availability: { from: '10:00' } },
        { type: ClinicTypeEnum.VET, availability: { from: '09:00' } },
      ] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([findAllDentalClinicsMock[0], findAllDentalClinicsMock[1], findAllVetClinicsMock[1]]);
    });

    it('should return only clinics with the availability.to greater or equal to query.to', async () => {
      // given
      const query = {
        to: '20:00',
      } as GetClinicsRequestDTO;

      const findAllDentalClinicsMock = [
        { type: ClinicTypeEnum.DENTAL, availability: { to: '21:00' } },
        { type: ClinicTypeEnum.DENTAL, availability: { to: '19:00' } },
      ] as DentalClinic[];
      const findAllDentalClinicsSpy = jest.spyOn(dentalClinicService, 'findAllDentalClinics').mockResolvedValueOnce(findAllDentalClinicsMock);
      const findAllVetClinicsMock = [
        { type: ClinicTypeEnum.VET, availability: { to: '21:30' } },
        { type: ClinicTypeEnum.VET, availability: { to: '20:00' } },
      ] as VetClinic[];
      const findAllVetClinicsSpy = jest.spyOn(vetClinicService, 'findAllVetClinics').mockResolvedValueOnce(findAllVetClinicsMock);

      // when
      const response = await getClinicsUseCase.findClinics(query);

      // then
      expect(findAllDentalClinicsSpy).toHaveBeenCalledTimes(1);
      expect(findAllVetClinicsSpy).toHaveBeenCalledTimes(1);
      expect(response).toEqual([findAllDentalClinicsMock[0], findAllVetClinicsMock[0], findAllVetClinicsMock[1]]);
    });
  });
});
