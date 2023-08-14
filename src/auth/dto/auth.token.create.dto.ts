import { ApiProperty } from '@nestjs/swagger'

export class AuthTokenRequestDto {
  @ApiProperty({ required: true })
  nodeId: string

  @ApiProperty({ required: true })
  apiKeyId: string

  @ApiProperty({ required: true })
  apiKeySecret: string
}
