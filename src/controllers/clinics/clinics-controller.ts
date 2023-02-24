import { GetClinicsRequestDTO, GetClinicsResponseDTO } from '@controllers/clinics/dtos';
import { Controller, Get, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { IGetClinicsUseCase } from './di';

@Controller('/clinics')
@ApiTags('Clinics')
class ClinicsController {
  constructor(private readonly getClinicsUseCase: IGetClinicsUseCase) {}

  @Get()
  @ApiResponse({ status: 200, type: GetClinicsResponseDTO, description: 'Returns an array of clinics as data' })
  public async getClinics(@Query() query: GetClinicsRequestDTO): Promise<GetClinicsResponseDTO> {
    const clinics = await this.getClinicsUseCase.findClinics(query);
    return { data: clinics };
  }
}

export { ClinicsController };
