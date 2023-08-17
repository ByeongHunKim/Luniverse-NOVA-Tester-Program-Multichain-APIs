import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from '../auth/auth.service'
import axios from 'axios'

@Injectable()
export class NftService {

  private authToken: string
  private readonly baseUrl: string

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    this.baseUrl = this.configService.get<string>('novaServerBaseUrl')
  }

  async listNftContractMetadataByOwner(protocol: string, network: string, ownerAddress: string): Promise<any> {
    try {
      // todo 토큰의 유효성을 확인하고, 만료된 경우 새 토큰을 가져오는 로직을 추가 ( 그럴려면 db에 저장한 auth-token 을 사용해야함 )
      await this.fetchAndSetAuthToken()

      const endPoint = `${this.baseUrl}/${protocol}/${network}/nft/listNftContractMetadataByOwner`

      const headers = {
        'Authorization': `Bearer ${this.authToken}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }

      const response = await axios.post(endPoint, { ownerAddress }, { headers })
      return response.data
    } catch (e) {
      console.error('listNftContractMetadataByOwner - error ', e)
      return null
    }
  }

  private async fetchAndSetAuthToken() {
    try {
      const { nodeId, apiKeyId, apiKeySecret } = this.configService.get('nodeInfos')
      const authToken = await this.authService.fetchAuthTokenFromLuniverseAPI(nodeId, apiKeyId, apiKeySecret)
      this.authToken = authToken.access_token
    } catch (error) {
      console.error('Error fetching auth token:', error)
    }
  }
}
