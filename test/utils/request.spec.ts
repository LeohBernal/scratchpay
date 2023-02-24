import axios from 'axios';
import { executeRequest } from '@utils/request';

describe('executeRequest', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call axios.request with the provided request config', async () => {
    // given
    const requestConfig = { method: 'GET', url: 'someurl/clinics' };

    const axiosRequestMock = { name: 'foo' };
    const axiosRequestSpy = jest.spyOn(axios, 'request').mockResolvedValueOnce(axiosRequestMock);

    // when
    const response = await executeRequest(requestConfig);

    // then
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1);
    expect(axiosRequestSpy).toHaveBeenCalledWith(requestConfig);
    expect(response).toEqual(axiosRequestMock);
  });

  it('should throw an error if axios.request throws an error', async () => {
    // given
    const requestConfig = { method: 'GET', url: 'someurl/clinics' };

    const axiosRequestMock = new Error('Request failed');
    const axiosRequestSpy = jest.spyOn(axios, 'request').mockRejectedValueOnce(axiosRequestMock);

    // when
    const promise = executeRequest(requestConfig);

    // then
    await expect(promise).rejects.toThrow(axiosRequestMock);
    expect(axiosRequestSpy).toHaveBeenCalledTimes(1);
    expect(axiosRequestSpy).toHaveBeenCalledWith(requestConfig);
  });
});
