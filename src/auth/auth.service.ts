import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class AuthService {
  async fetchAuthTokenFromLuniverseAPI(
    nodeId: string,
    apiKeyId: string,
    apiKeySecret: string,
  ): Promise<any> {
    const response = await axios.request({
      method: 'post',
      baseURL: 'https://web3.luniverse.io/v1/',
      url: '/auth-token',
      headers: {
        'X-NODE-ID': nodeId,
        'X-Key-ID': apiKeyId,
        'X-Key-Secret': apiKeySecret,
      },
    })
    return response.data
  }
}
