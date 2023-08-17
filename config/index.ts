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
  novaServerBaseUrl: 'https://web3.luniverse.io/v1/'
})
