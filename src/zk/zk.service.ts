import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ethers } from 'ethers'

@Injectable()
export class ZkService {
  private readonly contractAddress: string
  private readonly abi: any[]
  private readonly nodeId: string
  private readonly endpoint: string
  private readonly provider: ethers.JsonRpcProvider
  private readonly contract: ethers.Contract
  private readonly wallet: ethers.Wallet

  constructor(private readonly configService: ConfigService) {
    this.contractAddress = this.configService.get<string>('contract.address')
    this.abi = this.configService.get<any[]>('contract.abi')
    this.nodeId = this.configService.get<string>('nodeInfos.nodeId')
    this.endpoint = this.configService.get<string>('contract.endpoint')

    this.provider = new ethers.JsonRpcProvider(`${this.endpoint}${this.nodeId}`)
    this.contract = new ethers.Contract(this.contractAddress, this.abi, this.provider)
    const signKey = this.configService.get<string>('contract.signKey')
    this.wallet = new ethers.Wallet(signKey, this.provider)
  }

  async createAgenda(
    title: string,
    description: string,
    deadline: number,
    agendaId: number,
  ): Promise<any> {
    try {
      const contract = this.contract.connect(this.wallet) as any
      const transaction = await contract.createAgenda(title, description, deadline, agendaId)
      const receipt = transaction.wait()
      console.log('receipt',receipt)
    } catch (error) {
      console.error('Error:', error)
    }
  }

}
