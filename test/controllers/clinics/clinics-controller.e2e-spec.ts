import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ClinicsModule } from '@controllers/clinics';
import { executeRequest } from '@utils/request';

jest.mock('@utils/request');

describe('[e2e] ClinicsController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ClinicsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();
  });

  describe('[GET] /clinics', () => {
    it('[200] should return an array as data if query is empty', async () => {
      (executeRequest as jest.Mock).mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({ data: [] });

      return request(app.getHttpServer())
        .get('/clinics')
        .expect(200)
        .expect(res => {
          expect(res.body.data instanceof Array).toEqual(true);
        });
    });

    it('[200] should return an array as data if all query properties are correct', async () => {
      (executeRequest as jest.Mock).mockResolvedValueOnce({ data: [] }).mockResolvedValueOnce({ data: [] });

      return request(app.getHttpServer())
        .get('/clinics')
        .query({
          from: '08:00',
          to: '18:00',
          type: 'DENTAL',
          name: 'foo',
          state: 'Alaska',
        })
        .expect(200)
        .expect(res => {
          expect(res.body.data instanceof Array).toEqual(true);
        });
    });

    it('[400] should return a bad request if query.from is not a valid state', async () => {
      return request(app.getHttpServer()).get('/clinics').query({ from: 'INVALID_STATE' }).expect(400);
    });

    it('[400] should return a bad request if query.from is not a valid hour format', async () => {
      return request(app.getHttpServer()).get('/clinics').query({ from: '08:65' }).expect(400);
    });

    it('[400] should return a bad request if query.to is not a valid hour format', async () => {
      return request(app.getHttpServer()).get('/clinics').query({ to: '25:35' }).expect(400);
    });

    it('[400] should return a bad request if query.type is not a valid clinic type', async () => {
      return request(app.getHttpServer()).get('/clinics').query({ type: 'INVALID_TYPE' }).expect(400);
    });
  });
});
