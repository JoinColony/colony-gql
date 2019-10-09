import { TokenClient } from 'colony-js'
import { AddressZero } from 'ethers/constants'

import { ETHER_NAME, ETHER_SYMBOL, ETHER_DECIMALS } from '../constants'

export type TokenResolverArgs = TokenClient

const resolveTokenAddress = async (tokenClient: TokenResolverArgs) => {
  return tokenClient.addressPromise
}

const resolveTokenName = async (tokenClient: TokenResolverArgs) => {
  const address = await tokenClient.addressPromise
  if (address === AddressZero) {
    return ETHER_NAME
  }
  try {
    const name = await tokenClient.name()
    return name
  } catch (e) {
    return null
  }
}

const resolveTokenSymbol = async (tokenClient: TokenResolverArgs) => {
  const address = await tokenClient.addressPromise
  if (address === AddressZero) {
    return ETHER_SYMBOL
  }
  try {
    const symbol = await tokenClient.symbol()
    return symbol
  } catch (e) {
    return null
  }
}

const resolveTokenDecimals = async (tokenClient: TokenResolverArgs) => {
  const address = await tokenClient.addressPromise
  if (address === AddressZero) {
    return ETHER_DECIMALS
  }
  try {
    const decimals = await tokenClient.decimals()
    return decimals
  } catch (e) {
    return null
  }
}

export default {
  address: resolveTokenAddress,
  name: resolveTokenName,
  symbol: resolveTokenSymbol,
  decimals: resolveTokenDecimals,
}
