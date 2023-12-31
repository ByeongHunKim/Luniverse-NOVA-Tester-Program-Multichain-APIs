import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { NftModule } from './nft/nft.module'
import { ConfigModule } from '@nestjs/config'
import { ZkModule } from './zk/zk.module'
import config from '../config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      isGlobal: true,
    }),
    AuthModule,
    NftModule,
    ZkModule,
  ],
})
export class AppModule {}
