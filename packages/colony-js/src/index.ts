import { ethers } from 'ethers'
import { Network, getNetwork } from 'ethers/utils'

import ColonyClient from './ColonyClient'
import ColonyNetworkClient from './ColonyNetworkClient'

const getColonyNetworkAddress = (network: Network | string) => {
  const { name: networkName } = getNetwork(network || 'homestead')

  if (!networkName) {
    throw new Error(`Unknown network: ${network}`)
  }

  switch (networkName) {
    case 'homestead':
      return '0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef'

    case 'goerli':
      return '0x79073fc2117dD054FCEdaCad1E7018C9CbE3ec0B'
  
    default:
      throw new Error(`Undeployed network: ${networkName}`)
  }
}

const getColonyNetworkClient = (network: Network | string = 'homestead') => {
  return new ColonyNetworkClient(
    getColonyNetworkAddress(network),
    ethers.getDefaultProvider(network),
  )
}

export {
  ColonyClient,
  ColonyNetworkClient,
  getColonyNetworkClient,
  getColonyNetworkAddress
}

export default getColonyNetworkClient
