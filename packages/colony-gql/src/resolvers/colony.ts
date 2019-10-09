import { ColonyClient } from 'colony-js'
import { BigNumber } from 'ethers/utils'
import { AddressZero } from 'ethers/constants'

import { Context } from '../utils'
import { TaskResolverArgs } from './task'
import { DomainResolverArgs } from './domain'
import { TokenBalanceResolverArgs } from './tokenBalance'

export type ColonyResolverArgs = ColonyClient

const resolveColonyId = async (
  colonyClient: ColonyResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
) => {
  const address = await colonyClient.addressPromise
  const [
    {
      values: { colonyId },
    },
  ] = await colonyNetworkClient.getEvents('ColonyAdded', [null, address])
  return colonyId.toString()
}

const resolveColonyAddress = (colonyClient: ColonyResolverArgs) => {
  return colonyClient.addressPromise
}

const resolveColonyENSName = async (
  colonyClient: ColonyResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
) => {
  const address = await colonyClient.addressPromise
  return colonyNetworkClient.lookupRegisteredENSDomain(address)
}

// TODO: should have a separate resolver for ColonyProfile
const resolveColonyProfile = async (
  colonyClient: ColonyResolverArgs,
  _: void,
  { colonyData }: Context
) => {
  const colonyAddress = await colonyClient.addressPromise
  const db = await colonyData.getColonyProfileStore(colonyAddress)
  const name = db.get('name')
  const avatarHash = db.get('avatarHash')
  return { name, avatarHash }
}

const resolveColonyDomains = async (
  colonyClient: ColonyResolverArgs
): Promise<DomainResolverArgs[]> => {
  const domainCount = await colonyClient.getDomainCount()
  return Promise.all(
    Array.from(Array(domainCount).keys()).map(id =>
      resolveColonyDomain(colonyClient, { id: (id + 1).toString() })
    )
  )
}

const resolveColonyDomain = async (
  colonyClient: ColonyResolverArgs,
  { id }: { id: string }
): Promise<DomainResolverArgs> => {
  const { skillId, fundingPotId } = await colonyClient.getDomain(id)
  return { colonyClient, id, skill: skillId, fundingPotId }
}

const resolveColonyFundingPots = async (colonyClient: ColonyResolverArgs) => {
  const fundingPotCount = await colonyClient.getFundingPotCount()
  // TODO: start at 0 or 1?
  return Array.from(Array(fundingPotCount).keys()).map(id => ({
    colonyClient,
    id: id.toString(),
  }))
}

const resolveColonyTaskCount = async (
  colonyClient: ColonyResolverArgs
): Promise<TaskResolverArgs[]> => {
  const taskCount = await colonyClient.getTaskCount()
  return taskCount.toString()
}

const resolveColonyTasks = async (
  colonyClient: ColonyResolverArgs
): Promise<TaskResolverArgs[]> => {
  const taskCount = (await colonyClient.getTaskCount()).toNumber()
  // TODO: start at 0 or 1?
  return Promise.all(
    Array.from(Array(taskCount).keys()).map(id =>
      resolveColonyTask(colonyClient, { id: id.toString() })
    )
  )
}

const resolveColonyTask = async (
  colonyClient: ColonyResolverArgs,
  { id }: { id: string }
): Promise<TaskResolverArgs> => {
  const {
    specificationHash,
    deliverableHash,
    status,
    dueDate,
    fundingPotId,
    completionTimestamp,
    domainId,
    skillIds,
  } = await colonyClient.getTask(id)

  return {
    colonyClient,
    id,
    specificationHash,
    deliverableHash,
    status,
    dueDate: dueDate.toString(),
    fundingPot: fundingPotId.toString(),
    completionDate: completionTimestamp.toString(),
    domainId: domainId.toString(),
    skills: skillIds.map((skillId: BigNumber) => skillId.toString()),
  }
}

const resolveColonyBalances = async (
  colonyClient: ColonyResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
): Promise<TokenBalanceResolverArgs[]> => {
  const address = await colonyClient.addressPromise
  const tokenClient = await colonyNetworkClient.getTokenClient()
  const events = await tokenClient.getEvents('Transfer', [null, address], {
    address: null,
  })
  const addressesSet = events.reduce(
    (addresses, event) => addresses.add(event.address),
    new Set<string>([AddressZero])
  )
  return Array.from(addressesSet).map(tokenAddress => ({
    tokenAddress,
    address,
  }))
}

const resolveColonyBalance = async (
  colonyClient: ColonyResolverArgs,
  { addressOrName }: { addressOrName: string },
  { colonyNetworkClient }: Context
): Promise<TokenBalanceResolverArgs> => {
  const address = await colonyClient.addressPromise
  const tokenAddress = await colonyNetworkClient.provider.resolveName(
    addressOrName
  )
  return {
    tokenAddress,
    address,
  }
}

export default {
  id: resolveColonyId,
  address: resolveColonyAddress,
  ensName: resolveColonyENSName,
  profile: resolveColonyProfile,
  domains: resolveColonyDomains,
  domain: resolveColonyDomain,
  fundingPots: resolveColonyFundingPots,
  taskCount: resolveColonyTaskCount,
  tasks: resolveColonyTasks,
  task: resolveColonyTask,
  balances: resolveColonyBalances,
  balance: resolveColonyBalance,
}
