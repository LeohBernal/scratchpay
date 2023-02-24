import { HealthController } from '@controllers/health/health-controller';
import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@utils/request');
jest.mock('@models/clinics');

describe('HealthController', () => {
  let healthController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [HealthController],
    }).compile();

    healthController = app.get(HealthController);
  });

  it('should be defined', () => {
    expect(healthController).toBeDefined();
  });

  describe('health', () => {
    it('should return an "OK"', async () => {
      // given

      // when
      const response = await healthController.health();

      // then
      expect(response).toEqual('OK');
    });
  });
});
