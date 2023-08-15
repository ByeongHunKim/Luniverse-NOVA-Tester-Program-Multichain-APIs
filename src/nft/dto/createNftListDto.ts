import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
export class CreateNftListDto {
  @IsString()
  @ApiProperty({ required: true })
  ownerAddress: string
}