import { Signer } from 'ethers'
import { Provider } from 'ethers/providers'

import BaseClient from './BaseClient.js'
import TOKEN_ABI from './abis/Token.json'

export default class TokenClient extends BaseClient {
  constructor(addressOrName: string, signerOrProvider: Signer | Provider) {
    super(addressOrName, TOKEN_ABI, signerOrProvider)
  }
}
