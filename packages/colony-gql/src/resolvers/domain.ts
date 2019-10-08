import { ColonyClient } from 'colony-js'

export interface DomainResolverArgs {
  colonyClient: ColonyClient
  id: string
  skill: string
  fundingPot: string
}

const resolveDomainName = () => {
  // TODO: get name from DDB
  return null
}

const resolveDomainParent = ({ id }: DomainResolverArgs) => {
  // Root domain will not have parents
  if (id === '1') {
    return null
  }

  // Non-root must currently have root parent
  return '1'
}

export default {
  name: resolveDomainName,
  parent: resolveDomainParent,
}
