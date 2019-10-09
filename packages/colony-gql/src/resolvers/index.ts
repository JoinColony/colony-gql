import userResolvers from './user'
import colonyResolvers from './colony'
import domainResolvers from './domain'
import taskResolvers from './task'
import tokenResolvers from './token'
import tokenBalanceResolvers from './tokenBalance'
import { Context } from '../utils'

export default {
  Query: {
    user: async (
      _: undefined,
      { addressOrName }: { addressOrName: string },
      { colonyNetworkClient }: Context,
    ) =>
      addressOrName
      ? colonyNetworkClient.provider.resolveName(addressOrName)
      : colonyNetworkClient.signer.getAddress(),
    colony: async (
      _: undefined,
      { addressOrName }: { addressOrName: string },
      { colonyNetworkClient }: Context,
    ) => colonyNetworkClient.getColonyClient(addressOrName),
  },
  User: userResolvers,
  Colony: colonyResolvers,
  Domain: domainResolvers,
  Task: taskResolvers,
  Token: tokenResolvers,
  TokenBalance: tokenBalanceResolvers,
  FundingPotType: {
    'UNASSIGNED': 0,
    'DOMAIN': 1,
    'TASK': 2,
    'PAYMENT': 3,
  },
  TaskStatus: {
    'ACTIVE': 0,
    'CANCELLED': 1,
    'FINALIZED': 2,
  },
  TaskRating: {
    'UNSATISFACTORY': 0,
    'SATISFACTORY': 1,
    'EXCELLENT': 2,
  },
}
