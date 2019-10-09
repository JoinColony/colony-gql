import { Signer } from 'ethers'
import { Provider } from 'ethers/providers'
import { AddressZero } from 'ethers/constants'

import BaseClient from './BaseClient'
import ColonyClient from './ColonyClient'
import TokenClient from './TokenClient'
import COLONY_NETWORK_ABI from './abis/ColonyNetwork.json'

export default class ColonyNetworkClient extends BaseClient {
  colonyClients = new Map<string, ColonyClient>() // TODO: clear on network client changes
  tokenClients = new Map<string, TokenClient>()

  constructor(addressOrName: string, signerOrProvider: Signer | Provider) {
    super(addressOrName, COLONY_NETWORK_ABI, signerOrProvider)
  }

  async getColonyClient(addressOrName: string = AddressZero) {
    const address = await this.provider.resolveName(addressOrName)
    let client = this.colonyClients.get(address)

    if (client) {
      return client
    }

    client = new ColonyClient(address, this.signer || this.provider)
    this.colonyClients.set(address, client)
    return client
  }

  async getTokenClient(addressOrName: string = AddressZero) {
    const address = await this.provider.resolveName(addressOrName)
    let client = this.tokenClients.get(address)

    if (client) {
      return client
    }

    client = new TokenClient(address, this.signer || this.provider)
    this.tokenClients.set(address, client)
    return client
  }
}
