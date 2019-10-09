import { Contract } from 'ethers'
import { LogDescription } from 'ethers/utils'

export interface DecodedLog extends LogDescription {
  address: string
}

export default class BaseClient extends Contract {
  /**
   * Get past logs for an event of the contract and parse.
   * @param eventName Name of the event
   * @param params Indexed event params to filter by
   * @param options Options to use for getLogs alongside the filter
   */
  async getEvents(
    eventName: string,
    params: any[] = [],
    {
      fromBlock = 1,
      address,
    }: { fromBlock?: number; address?: string | null } = {}
  ): Promise<DecodedLog[]> {
    const filterFunction = this.filters[eventName]
    if (!filterFunction) {
      throw new Error(`No such event: ${eventName}`)
    }
    const filter = filterFunction(...params)
    const logs = await this.provider.getLogs({
      ...filter,
      fromBlock,
      address: address === undefined ? filter.address : address || undefined,
    })
    const events = logs.map(log => ({
      ...this.interface.parseLog(log),
      address: log.address,
    }))
    return events
  }
}
