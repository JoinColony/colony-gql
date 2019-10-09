import { TokenClient } from 'colony-js'

import { Context } from '../utils'

export type TokenResolverArgs = TokenClient

const resolveTokenAddress = async (
  tokenClient: TokenResolverArgs,
) => {
  return tokenClient.addressPromise
}

const resolveTokenName = async (
  tokenClient: TokenResolverArgs,
) => {
  return tokenClient.name()
}

const resolveTokenSymbol = async (
  tokenClient: TokenResolverArgs,
) => {
  return tokenClient.symbol()
}

const resolveTokenDecimals = async (
  tokenClient: TokenResolverArgs,
) => {
  const decimals = await tokenClient.decimals()
  return decimals.toString()
}

export default {
  address: resolveTokenAddress,
  name: resolveTokenName,
  symbol: resolveTokenSymbol,
  decimals: resolveTokenDecimals,
}
