import { AddressZero } from 'ethers/constants'

import { Context } from '../utils'
import { TokenResolverArgs } from './token'

export interface TokenBalanceResolverArgs {
  tokenAddress: string
  address?: string
  amount?: string
}

const resolveTokenBalanceToken = async (
  { tokenAddress }: TokenBalanceResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
): Promise<TokenResolverArgs> => {
  return colonyNetworkClient.getTokenClient(tokenAddress)
}

const resolveTokenBalanceAmount = async (
  { tokenAddress, address, amount }: TokenBalanceResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
) => {
  if (amount) {
    return amount
  }
  if (!address) {
    throw new Error('Address must be provided if amount is omitted')
  }
  if (tokenAddress === AddressZero) {
    const fetchedAmount = await colonyNetworkClient.provider.getBalance(address)
    return fetchedAmount.toString()
  }
  const tokenClient = await colonyNetworkClient.getTokenClient(tokenAddress)
  const fetchedAmount = await tokenClient.balanceOf(address)
  return fetchedAmount.toString()
}

export default {
  token: resolveTokenBalanceToken,
  amount: resolveTokenBalanceAmount,
}
