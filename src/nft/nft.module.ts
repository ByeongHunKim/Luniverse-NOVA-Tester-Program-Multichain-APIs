import { Module } from '@nestjs/common'
import { NftController } from './nft.controller'
import { NftService } from './nft.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [NftController],
  imports: [AuthModule],
  providers: [NftService]
})
export class NftModule {}
