import { KeyValueStore } from 'orbit-db-kvstore'

import { Context } from '../utils'

export interface UserResolverArgs {
  userStore: KeyValueStore<any>
  address: string
}

const resolveUserENSName = (
  { address }: UserResolverArgs,
  _: void,
  { colonyNetworkClient }: Context
) => {
  return colonyNetworkClient.lookupRegisteredENSDomain(address)
}

const resolveUserName = async (
  { userStore }: UserResolverArgs,
  _: void,
  { colonyData }: Context
) => {
  return userStore.get('name')
}

const resolveUserBio = async (
  { userStore }: UserResolverArgs,
  _: void,
  { colonyData }: Context
) => {
  return userStore.get('bio')
}

const resolveUserAvatarHash = async (
  { userStore }: UserResolverArgs,
  _: void,
  { colonyData }: Context
) => {
  return userStore.get('avatarHash')
}

export default {
  ensName: resolveUserENSName,
  name: resolveUserName,
  bio: resolveUserBio,
  avatarHash: resolveUserAvatarHash,
}
