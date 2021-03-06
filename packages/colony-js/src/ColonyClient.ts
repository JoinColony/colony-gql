import { Signer } from 'ethers'
import { Provider } from 'ethers/providers'

import BaseClient from './BaseClient.js'
import COLONY_ABI from './abis/Colony.json'

export default class ColonyClient extends BaseClient {
  constructor(addressOrName: string, signerOrProvider: Signer | Provider) {
    super(addressOrName, COLONY_ABI, signerOrProvider)
  }
}
