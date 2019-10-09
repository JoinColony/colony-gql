import { ColonyClient } from 'colony-js'

import { Context } from '../utils'
import { TokenBalanceResolverArgs } from './tokenBalance'

export interface DomainResolverArgs {
  colonyClient: ColonyClient
  id: string
  skill: string
  fundingPot: string
}

const resolveDomainName = () => {
  // TODO: get name from DDB
  return null
}

const resolveDomainParent = ({ id }: DomainResolverArgs) => {
  // Root domain will not have parents
  if (id === '1') {
    return null
  }

  // Non-root must currently have root parent
  return '1'
}

const resolveDomainBalances = async (): Promise<TokenBalanceResolverArgs[]> => {
  // TODO: get list of relevant tokens for domain
  return []
}

const resolveDomainBalance = async (
  { colonyClient, fundingPot }: DomainResolverArgs,
  { addressOrName }: { addressOrName: string },
  { colonyNetworkClient }: Context,
): Promise<TokenBalanceResolverArgs> => {
  const tokenAddress = await colonyNetworkClient.provider.resolveName(addressOrName)
  const balance = await colonyClient.getFundingPotBalance(
    fundingPot,
    addressOrName,
  )
  return {
    amount: balance.toString(),
    tokenAddress,
  }
}

export default {
  name: resolveDomainName,
  parent: resolveDomainParent,
  balances: resolveDomainBalances,
  balance: resolveDomainBalance,
}
