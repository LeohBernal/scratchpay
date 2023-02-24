import { ClinicsController } from '@controllers/clinics/clinics-controller';
import { IGetClinicsUseCase } from '@controllers/clinics/di';
import { GetClinicsRequestDTO } from '@controllers/clinics/dtos';
import { Clinic } from '@models/clinics';
import { Test, TestingModule } from '@nestjs/testing';

describe('ClinicsController', () => {
  let clinicsController: ClinicsController;
  let getClinicsUseCase: IGetClinicsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [ClinicsController, { provide: IGetClinicsUseCase, useValue: { findClinics: jest.fn() } }],
    }).compile();

    clinicsController = app.get(ClinicsController);
    getClinicsUseCase = app.get(IGetClinicsUseCase);
  });

  it('should be defined', () => {
    expect(clinicsController).toBeDefined();
  });

  describe('getClinics', () => {
    it('should return an object with an array of clinics as data', async () => {
      // given
      const query = {} as GetClinicsRequestDTO;
      const getClinicsUseCaseMock = [{ type: 'DENTAL' }, { type: 'VET' }] as Clinic[];
      const getClinicsUseCaseSpy = jest.spyOn(getClinicsUseCase, 'findClinics').mockResolvedValueOnce(getClinicsUseCaseMock);

      // when
      const response = await clinicsController.getClinics(query);

      // then
      expect(getClinicsUseCaseSpy).toHaveBeenCalledTimes(1);
      expect(getClinicsUseCaseSpy).toHaveBeenCalledWith(query);
      expect(response).toEqual({ data: getClinicsUseCaseMock });
    });
  });
});
