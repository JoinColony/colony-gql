import userResolvers, { UserResolverArgs } from './user'
import skillResolvers from './skill'
import colonyResolvers, { ColonyResolverArgs } from './colony'
import domainResolvers from './domain'
import fundingPotResolvers from './fundingPot'
import taskResolvers from './task'
import tokenResolvers from './token'
import tokenBalanceResolvers from './tokenBalance'
import { Context } from '../utils'

export default {
  Query: {
    user: async (
      _: void,
      { addressOrName }: { addressOrName: string },
      { colonyNetworkClient, colonyData }: Context
    ): Promise<UserResolverArgs> => {
      const address = addressOrName
        ? await colonyNetworkClient.provider.resolveName(addressOrName)
        : await colonyNetworkClient.signer.getAddress()
      const userStore = await colonyData.getUserProfileStore(address)
      return {
        userStore,
        address,
      }
    },
    colony: async (
      _: void,
      { addressOrName }: { addressOrName: string },
      { colonyNetworkClient }: Context
    ): Promise<ColonyResolverArgs> =>
      colonyNetworkClient.getColonyClient(addressOrName),
  },
  User: userResolvers,
  Skill: skillResolvers,
  Colony: colonyResolvers,
  Domain: domainResolvers,
  FundingPot: fundingPotResolvers,
  Task: taskResolvers,
  Token: tokenResolvers,
  TokenBalance: tokenBalanceResolvers,
  FundingPotType: {
    UNASSIGNED: 0,
    DOMAIN: 1,
    TASK: 2,
    PAYMENT: 3,
  },
  TaskStatus: {
    ACTIVE: 0,
    CANCELLED: 1,
    FINALIZED: 2,
  },
  TaskRating: {
    UNSATISFACTORY: 0,
    SATISFACTORY: 1,
    EXCELLENT: 2,
  },
  FundingPotAssociated: {
    __resolveType: ({ type }: { type: number }) => {
      switch (type) {
        case 1:
          return 'Domain'

        case 2:
          return 'Task'

        default:
          return null
      }
    },
  },
}
