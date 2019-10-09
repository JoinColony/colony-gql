import { ColonyClient } from 'colony-js'
import { BigNumber } from 'ethers/utils'
import { DomainResolverArgs } from './domain'
import { TaskResolverArgs } from './task'

export interface FundingPotResolverArgs {
  colonyClient: ColonyClient

  // Already resolved
  id: string
  type: number
  payoutsWeCannotMake: string

  // Needs resolving
  associatedTypeId: string
}

type FundingPotAssociatedResolverArgs = (
  | DomainResolverArgs
  | TaskResolverArgs) & {
  type: number
}

const resolveAssociated = async ({
  colonyClient,
  type,
  associatedTypeId,
}: FundingPotResolverArgs): Promise<FundingPotAssociatedResolverArgs | null> => {
  switch (type) {
    case 1: {
      const { skillId, fundingPotId } = await colonyClient.getDomain(
        associatedTypeId
      )
      return {
        type,
        colonyClient,
        id: associatedTypeId,
        skill: skillId,
        fundingPotId,
      }
    }

    case 2: {
      const {
        specificationHash,
        deliverableHash,
        status,
        dueDate,
        fundingPotId,
        completionTimestamp,
        domainId,
        skillIds,
      } = await colonyClient.getTask(associatedTypeId)

      return {
        type,
        colonyClient,
        id: associatedTypeId,
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

    default:
      return null
  }
}

const resolvePayouts = ({ colonyClient, id }: FundingPotResolverArgs) => {
  return []
}

export default {
  associated: resolveAssociated,
  payouts: resolvePayouts,
}
