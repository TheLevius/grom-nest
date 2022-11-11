import { ApiProperty } from '@nestjs/swagger';

export class NotFoundResponse {
  @ApiProperty({
    default: 404,
  })
  statusCode: number;
  @ApiProperty({
    default: 'Not found',
  })
  message: string;
}
