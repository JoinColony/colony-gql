import { ColonyClient } from 'colony-js'

import { Context } from '../utils'
import { TokenBalanceResolverArgs } from './tokenBalance'
import { FundingPotResolverArgs } from './fundingPot'

export interface DomainResolverArgs {
  colonyClient: ColonyClient

  // Already resolved
  id: string
  skill: string

  // Needs resolving
  fundingPotId: string
}

const resolveDomainName = () => {
  // TODO: get name from DDB
  return null
}

const resolveDomainParent = ({ id }: DomainResolverArgs): DomainResolverArgs | null => {
  // Root domain will not have parents
  if (id === '1') {
    return null
  }

  // Non-root must currently have root parent
  return '1'
}

const resolveFundingPot = async ({
  colonyClient,
  fundingPotId,
}: DomainResolverArgs): Promise<FundingPotResolverArgs> => {
  const {
    associatedType,
    associatedTypeId,
    payoutsWeCannotMake,
  } = await colonyClient.getFundingPot(fundingPotId)
  return {
    colonyClient,
    id: fundingPotId,
    type: associatedType,
    associatedTypeId: associatedTypeId.toString(),
    payoutsWeCannotMake: payoutsWeCannotMake.toString(),
  }
}

const resolveDomainBalances = async (): Promise<TokenBalanceResolverArgs[]> => {
  // TODO: get list of relevant tokens for domain
  return []
}

const resolveDomainBalance = async (
  { colonyClient, fundingPotId }: DomainResolverArgs,
  { addressOrName }: { addressOrName: string },
  { colonyNetworkClient }: Context
): Promise<TokenBalanceResolverArgs> => {
  const tokenAddress = await colonyNetworkClient.provider.resolveName(
    addressOrName
  )
  const balance = await colonyClient.getFundingPotBalance(
    fundingPotId,
    addressOrName
  )
  return {
    amount: balance.toString(),
    tokenAddress,
  }
}

export default {
  name: resolveDomainName,
  parent: resolveDomainParent,
  fundingPot: resolveFundingPot,
  balances: resolveDomainBalances,
  balance: resolveDomainBalance,
}
