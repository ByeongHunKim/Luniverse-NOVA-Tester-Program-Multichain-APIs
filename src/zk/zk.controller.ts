import { Controller, Body, Post } from '@nestjs/common'
import { ApiOperation, ApiTags, ApiBody } from '@nestjs/swagger'
import { ZkService } from './zk.service'
import { CreateAgendaDto } from './dto/createAgendaDto'

@Controller('zk')
export class ZkController {

  constructor(
    private readonly zkService: ZkService,
  ) {}

  @Post()
  @ApiTags('zk')
  @ApiBody({ type: CreateAgendaDto })
  @ApiOperation({ summary : 'create Agenda', description: 'create Agenda is only allowed to Admin'})
  async createAgenda(
    @Body() createAgendaDto: CreateAgendaDto
  ): Promise<any> {
    const { title, description, deadline, agendaId } = createAgendaDto
    return this.zkService.createAgenda(title, description, deadline, agendaId)
  }
}
