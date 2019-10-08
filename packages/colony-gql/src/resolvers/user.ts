import { Context } from '../utils'

const resolveUserAddress = (userAddress: string) => {
  return userAddress
}

const resolveUserENSName = (
  userAddress: string,
  _: void,
  { colonyNetworkClient }: Context,
) => {
  return colonyNetworkClient.lookupRegisteredENSDomain(userAddress)
}

const resolveUserProfile = async (userAddress: string, _: void, { colonyData }: Context) => {
  const db = await colonyData.getUserProfileStore(userAddress)
  const name = db.get('name')
  const bio = db.get('bio')
  const avatarHash = db.get('avatarHash')
  return { name, bio, avatarHash }
}

export default {
  address: resolveUserAddress,
  ensName: resolveUserENSName,
  profile: resolveUserProfile,
}
