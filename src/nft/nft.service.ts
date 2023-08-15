import { Injectable } from '@nestjs/common'
import axios from 'axios'

@Injectable()
export class NftService {

  // todo config
  private BASE_URL = 'https://web3.luniverse.io/v1/'
  private AUTH_TOKEN = ''

  // params : protocol, network, body : ownerAddress
  async listNftContractMetadataByOwner(protocol: string, network: string, ownerAddress: string) : Promise<any> {
    try {
      console.log('ownerAddress',ownerAddress)
      const endPoint = `${this.BASE_URL}/${protocol}/${network}/nft/listNftContractMetadataByOwner`

      const headers = {
        'Authorization': `Bearer ${this.AUTH_TOKEN}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }

      const response = await axios.post(endPoint, { ownerAddress }, { headers })
      return response.data
    } catch (e) {
      console.error('listNftContractMetadataByOwner - error ',e)
      return null
    }
  }
}
