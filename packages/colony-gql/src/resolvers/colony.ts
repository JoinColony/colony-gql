import { ColonyClient } from 'colony-js'
import { BigNumber } from 'ethers/utils'

import { Context } from '../utils'
import { TaskResolverArgs } from './task'
import { DomainResolverArgs } from './domain'

const resolveColonyAddress = (
  colonyClient: ColonyClient,
  _: void,
  { colonyNetworkClient }: Context,
) => {
  return colonyClient.addressPromise
}

const resolveColonyENSName = async (
  colonyClient: ColonyClient,
  _: void,
  { colonyNetworkClient }: Context,
) => {
  const address = await colonyClient.addressPromise
  return colonyNetworkClient.lookupRegisteredENSDomain(address)
}

const resolveColonyProfile = async (colonyClient: ColonyClient, _: void, { colonyData }: Context) => {
  const colonyAddress = await colonyClient.addressPromise
  const db = await colonyData.getColonyProfileStore(colonyAddress)
  const name = db.get('name')
  const avatarHash = db.get('avatarHash')
  return { name, avatarHash }
}

const resolveColonyDomains = async (
  colonyClient: ColonyClient,
): Promise<DomainResolverArgs[]> => {
  const domainCount = await colonyClient.getDomainCount()
  return Promise.all(Array.from(Array(domainCount).keys()).map(id =>
    resolveColonyDomain(colonyClient, { id: id.toString() })
  ))
}

const resolveColonyDomain = async (
  colonyClient: ColonyClient,
  { id }: { id: string },
): Promise<DomainResolverArgs> => {
  const { skillId, fundingPotId } = await colonyClient.getDomain(id)
  return { colonyClient, id, skill: skillId, fundingPot: fundingPotId }
}

const resolveColonyFundingPots = async (colonyClient: ColonyClient) => {
  const fundingPotCount = await colonyClient.getFundingPotCount()
  // TODO: start at 0 or 1?
  return Array.from(Array(fundingPotCount).keys()).map(id => ({
    colonyClient,
    id: id.toString(),
  }))
}

const resolveColonyTaskCount = async (
  colonyClient: ColonyClient,
): Promise<TaskResolverArgs[]> => {
  const taskCount = await colonyClient.getTaskCount()
  return taskCount.toString()
}

const resolveColonyTasks = async (
  colonyClient: ColonyClient,
): Promise<TaskResolverArgs[]> => {
  const taskCount = (await colonyClient.getTaskCount()).toNumber()
  // TODO: start at 0 or 1?
  return Promise.all(Array.from(Array(taskCount).keys()).map(id =>
    resolveColonyTask(colonyClient, { id: id.toString() })
  ))
}

const resolveColonyTask = async (
  colonyClient: ColonyClient,
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
    skillIds: skillIds.map((skillId: BigNumber) => skillId.toString()),
  }
}

export default {
  address: resolveColonyAddress,
  ensName: resolveColonyENSName,
  profile: resolveColonyProfile,
  domains: resolveColonyDomains,
  domain: resolveColonyDomain,
  fundingPots: resolveColonyFundingPots,
  taskCount: resolveColonyTaskCount,
  tasks: resolveColonyTasks,
  task: resolveColonyTask,
}
