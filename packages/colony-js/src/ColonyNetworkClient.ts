import { Contract, Signer } from 'ethers'
import { Provider } from 'ethers/providers'

import ColonyClient from './ColonyClient'
import COLONY_NETWORK_ABI from './abis/ColonyNetwork.json'

export default class ColonyNetworkClient extends Contract {
  colonyClients = new Map<string, ColonyClient>() // TODO: clear on network client changes

  constructor(addressOrName: string, signerOrProvider: Signer | Provider) {
    super(addressOrName, COLONY_NETWORK_ABI, signerOrProvider)
  }

  async getColonyClient(addressOrName: string) {
    const address = await this.provider.resolveName(addressOrName)
    let client = this.colonyClients.get(address)

    if (client) {
      return client
    }

    client = new ColonyClient(address, this.signer || this.provider)
    this.colonyClients.set(address, client)
    return client
  }
}
