import { ColonyClient } from 'colony-js'

import { Context } from '../utils'
import { TokenBalanceResolverArgs } from './tokenBalance'
import { UserResolverArgs } from './user'

export interface TaskRoleResolverArgs {
  colonyClient: ColonyClient
  taskId: string
  role: number
  assignee: string
  rateFail: boolean
  rating: number
}

const resolveTaskRolePayouts = async ({
  colonyClient,
  taskId,
  role,
}: TaskRoleResolverArgs): Promise<TokenBalanceResolverArgs[]> => {
  const events = await colonyClient.getEvents('TaskPayoutSet', [taskId])
  return Object.entries(
    events.reduce(
      (acc: { [tokenAddress: string]: string }, { values }) =>
        values.role === role
          ? { ...acc, [values.token]: values.amount.toString() }
          : acc,
      {}
    )
  ).map(([tokenAddress, amount]) => ({ tokenAddress, amount }))
}

const resolveTaskRoleAssignee = async (
  { assignee }: TaskRoleResolverArgs,
  _: void,
  { colonyData }: Context
): Promise<UserResolverArgs> => {
  return {
    userStore: await colonyData.getUserProfileStore(assignee),
    address: assignee,
  }
}

export default {
  payouts: resolveTaskRolePayouts,
  assignee: resolveTaskRoleAssignee,
}
