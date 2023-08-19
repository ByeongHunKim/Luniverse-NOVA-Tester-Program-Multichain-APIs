import * as contractABI from './abi/abi.json'

export interface Config {
  port: number
  database: {
    url: string
  }
  nodeInfos: {
    nodeId: string
    apiKeyId: string
    apiKeySecret: string
  }
  novaServerBaseUrl: string
  contract: {
    endpoint: string
    address: string
    abi: any[]
    signKey: string
  };
}

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.DATABASE_URL,
  },
  nodeInfos: {
    nodeId: process.env.NODE_ID,
    apiKeyId: process.env.API_KEY_ID,
    apiKeySecret: process.env.API_KEY_SECRET,
  },
  novaServerBaseUrl: 'https://web3.luniverse.io/v1/',
  contract: {
    endpoint: 'https://polygon-mumbai.luniverse.io/',
    address: process.env.ZK_CONTRACT_ADDRESS,
    abi: contractABI,
    signKey: process.env.ZK_CONTRACT_SIGNKEY,
  }
})
