import { ColonyNetworkClient } from 'colony-js'
import ColonyData from 'colony-data'

export interface Context {
  colonyNetworkClient: ColonyNetworkClient
  colonyData: ColonyData
}
