import gql from 'graphql-tag'

export default gql`
  scalar Address
  scalar AddressOrName
  scalar BigInt
  scalar Date
  scalar ENSName
  scalar IPFSHash

  type Query {
    user(addressOrName: AddressOrName): User
    colony(addressOrName: AddressOrName!): Colony
  }

  type Subscription {
    userUpdated(addressOrName: AddressOrName): User
    colonyUpdated(addressOrName: AddressOrName!): Colony
  }

  type User {
    address: Address!
    ensName: ENSName
    profile: UserProfile
    colonies: [Colony!]!
    balances: [TokenBalance!]!
  }

  type UserProfile {
    name: String
    bio: String
    avatarHash: IPFSHash
  }

  type Skill {
    id: ID!
    name: String
    parent: Skill
  }

  type Colony {
    id: ID!
    address: Address!
    ensName: ENSName
    profile: ColonyProfile
    domains: [Domain!]!
    domain(id: ID!): Domain
    fundingPots: [FundingPot!]!
    taskCount: BigInt!
    tasks: [Task!]!
    task(id: ID!): Task
    balances: [TokenBalance!]! # total balance in all pots
    balance(addressOrName: AddressOrName!): TokenBalance
  }

  type ColonyProfile {
    name: String
    avatarHash: IPFSHash
  }

  type Domain {
    id: ID!
    name: String
    parent: Domain
    skill: Skill
    fundingPot: FundingPot
    balances: [TokenBalance!]!
    balance(addressOrName: AddressOrName!): TokenBalance
  }

  type FundingPot {
    id: ID!
    type: FundingPotType!
    associated: FundingPotAssociated
    payouts: [TokenBalance!]!
    payoutsWeCannotMake: Int!
  }

  union FundingPotAssociated = Domain | Task # also Payment

  enum FundingPotType {
    UNASSIGNED
    DOMAIN
    TASK
    PAYMENT
  }

  type Task {
    id: ID!
    specificationHash: IPFSHash # required?
    deliverableHash: IPFSHash # required?
    status: TaskStatus!
    dueDate: Date # required?
    fundingPot: FundingPot!
    completionDate: Date
    domain: Domain
    skills: [Skill!]!
    manager: TaskRole!
    evaluator: TaskRole!
    worker: TaskRole!
  }

  enum TaskStatus {
    ACTIVE
    CANCELLED
    FINALIZED
  }

  type TaskRole {
    assignee: User
    rateFail: Boolean
    rating: TaskRating
    payouts: [TokenBalance!]!
  }

  enum TaskRating {
    UNSATISFACTORY
    SATISFACTORY
    EXCELLENT
  }

  type Token {
    address: Address!
    name: String
    symbol: String
    decimals: Int
  }

  type TokenBalance {
    token: Token!
    amount: BigInt!
  }
`
