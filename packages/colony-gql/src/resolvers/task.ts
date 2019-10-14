import { ColonyClient } from 'colony-js'

import { DomainResolverArgs } from './domain'
import { SkillResolverArgs } from './skill'

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
  skills: SkillResolverArgs[]

  // Need resolving
  domainId: string
}

const resolveTaskDomain = async ({
  colonyClient,
  domainId,
}: TaskResolverArgs): Promise<DomainResolverArgs> => {
  const { skillId, fundingPotId } = await colonyClient.getDomain(domainId)
  return {
    colonyClient,
    id: domainId,
    skill: skillId,
    fundingPotId,
  }
}

const resolveTaskManager = async ({ id, colonyClient }: TaskResolverArgs) => {
  const role = 0
  const { rateFail, rating, user } = await colonyClient.getTaskRole(id, role)
  return { assignee: user, rateFail, rating, role }
}

const resolveTaskEvaluator = async ({ id, colonyClient }: TaskResolverArgs) => {
  const role = 1
  const { rateFail, rating, user } = await colonyClient.getTaskRole(id, role)
  return { assignee: user, rateFail, rating, role }
}

const resolveTaskWorker = async ({ id, colonyClient }: TaskResolverArgs) => {
  const role = 2
  const { rateFail, rating, user } = await colonyClient.getTaskRole(id, role)
  return { assignee: user, rateFail, rating, role }
}

export default {
  domain: resolveTaskDomain,
  manager: resolveTaskManager,
  evaluator: resolveTaskEvaluator,
  worker: resolveTaskWorker,
}
