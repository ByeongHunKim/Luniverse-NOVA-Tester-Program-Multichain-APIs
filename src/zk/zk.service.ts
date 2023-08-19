import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ethers } from 'ethers'

@Injectable()
export class ZkService {

  // todo JsonProvider 를 다른 모듈로 분리해야하나..
  private readonly contract: ethers.Contract
  private readonly wallet: ethers.Wallet
  private readonly provider: ethers.JsonRpcProvider

  constructor(private readonly configService: ConfigService) {
    this.provider = this.createProvider()
    this.contract = this.createContract()
    this.wallet = this.createWallet()
  }

  private createProvider(): ethers.JsonRpcProvider {
    const nodeId = this.configService.get<string>('nodeInfos.nodeId')
    const endpoint = this.configService.get<string>('contract.endpoint')
    return new ethers.JsonRpcProvider(`${endpoint}${nodeId}`)
  }

  private createContract(): ethers.Contract {
    const contractAddress = this.configService.get<string>('contract.address')
    const abi = this.configService.get<any[]>('contract.abi')
    return new ethers.Contract(contractAddress, abi, this.provider)
  }

  private createWallet(): ethers.Wallet {
    const signKey = this.configService.get<string>('contract.signKey')
    return new ethers.Wallet(signKey, this.provider)
  }

  async createAgenda(
    title: string,
    description: string,
    deadline: number,
    agendaId: number,
  ): Promise<any> {
    try {
      const contract = this.contract.connect(this.wallet) as any
      const transaction = await contract.createAgenda(
        title,
        description,
        deadline,
        agendaId
      )
      const receipt = await transaction.wait()
      console.log('receipt', receipt)
    } catch (error) {
      console.error('Error:', error)
    }
  }
}
