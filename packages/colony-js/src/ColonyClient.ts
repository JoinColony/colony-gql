import { Contract, Signer } from 'ethers'
import { Provider } from 'ethers/providers'

import COLONY_ABI from './abis/Colony.json'

export default class ColonyClient extends Contract {
  constructor(addressOrName: string, signerOrProvider: Signer | Provider) {
    super(addressOrName, COLONY_ABI, signerOrProvider)
  }
}
