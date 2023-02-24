import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('Health')
class HealthController {
  @Get()
  public async health() {
    return 'OK';
  }
}

export { HealthController };
