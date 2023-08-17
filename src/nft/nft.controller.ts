import { Body, Controller, Post, Param } from '@nestjs/common'
import { ApiOperation, ApiTags, ApiBody, ApiParam } from '@nestjs/swagger'
import { NftService } from './nft.service'
import { CreateNftListDto } from './dto/createNftListDto'

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @Post(':protocol/:network/listNftContractMetadataByOwner')
  @ApiTags('nft')
  @ApiOperation({ summary: 'check nft metadata'})
  @ApiParam({ name: 'protocol', description: 'Blockchain main network', type: 'string' })
  @ApiParam({ name: 'network', description: 'Blockchain network', type: 'string' })
  @ApiBody({ type: CreateNftListDto, description: 'NFT owner address' })
  async listNftContractMetadataByOwner(
    @Param('protocol') protocol: string,
    @Param('network') network: string,
    @Body() createNftListDto: CreateNftListDto,
  ): Promise<any> {
    const { ownerAddress } = createNftListDto
    return this.nftService.listNftContractMetadataByOwner(protocol, network, ownerAddress)
  }
}
