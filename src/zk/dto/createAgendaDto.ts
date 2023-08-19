import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'
export class CreateAgendaDto {
  @IsString()
  @ApiProperty({ required: true })
  title: string

  @IsString()
  @ApiProperty({ required: true })
  description: string

  @IsNumber()
  @ApiProperty({ required: true })
  deadline: number

  @IsNumber()
  @ApiProperty({ required: true })
  agendaId: number
}