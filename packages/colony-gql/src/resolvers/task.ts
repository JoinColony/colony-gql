import { ColonyClient } from 'colony-js'

import { DomainResolverArgs } from './domain'
import { Context } from '../utils'

export interface TaskResolverArgs {
  colonyClient: ColonyClient

  // Already resolved
  id: string
  specificationHash: string
  deliverableHash: string
  status: number
  dueDate: string
  fundingPot: string
  completionDate: string

  // Need resolving
  domainId: string
  skillIds: string[]
}

const resolveTaskDomain = async (
  { colonyClient, domainId }: TaskResolverArgs
): Promise<DomainResolverArgs> => {
  const { skillId, fundingPotId } = await colonyClient.getDomain(domainId)
  return {
    colonyClient,
    id: domainId,
    skill: skillId,
    fundingPot: fundingPotId
  }
}

const resolveTaskSkills = async () => {
  // TODO: resolve skills
  return null
}

const resolveTaskManager = async () => {
  // TODO: resolve manager
  return null
}

const resolveTaskEvaluator = async () => {
  // TODO: resolve evaluator
  return null
}

const resolveTaskWorker = async () => {
  // TODO: resolve worker
  return null
}

export default {
  domain: resolveTaskDomain,
  skills: resolveTaskSkills,
  manager: resolveTaskManager,
  evaluator: resolveTaskEvaluator,
  worker: resolveTaskWorker,
}
