import IPFS from 'ipfs'
import OrbitDB from 'orbit-db'

export default class DDB {
  chainId: number
  orbitdb: Promise<OrbitDB>

  constructor(chainId: number) {
    this.chainId = chainId

    const ipfs = new IPFS({
      config: {
        Addresses: {
          Swarm: [
            '/dns4/colony.io/tcp/9090/wss/p2p-websocket-star/',
            '/dns4/colony.io/tcp/9091/wss/p2p-webrtc-star/',
          ],
        },
        Bootstrap: [],
        Discovery: {
          webRTCStar: {
            Enabled: true,
          },
        },
      },
      EXPERIMENTAL: {
        pubsub: true,
      },
    })

    this.orbitdb = new Promise((resolve, reject) => {
      ipfs.on('ready', async () => {
        try {
          const orbitdb = await OrbitDB.createInstance(ipfs)
          return resolve(orbitdb)
        } catch (error) {
          return reject(error)
        }
      })
    })
  }

  async getUserProfileStore(walletAddress: string) {
    const orbitdb = await this.orbitdb
    const db = await orbitdb.keyvalue(`network.${this.chainId}.user.${walletAddress}`, {
      accessController: {
        write: ['*'],
      },
    } as any)
    await db.load()
    return db
  }

  async getTaskStore(colonyAddress: string, taskId: string) {
    const orbitdb = await this.orbitdb
    const db = await orbitdb.keyvalue(`network.${this.chainId}.colony.${colonyAddress}.task.${taskId}`, {
      accessController: {
        write: ['*'],
      },
    } as any)
    await db.load()
    return db
  }

  async getTaskCommentsStore(colonyAddress: string, taskId: string) {
    const orbitdb = await this.orbitdb
    const db = await orbitdb.feed(`network.${this.chainId}.colony.${colonyAddress}.task.${taskId}.comments`, {
      accessController: {
        write: ['*'],
      },
    } as any)
    await db.load()
    return db
  }

  async getColonyProfileStore(colonyAddress: string) {
    const orbitdb = await this.orbitdb
    const db = await orbitdb.keyvalue(`network.${this.chainId}.colony.${colonyAddress}`, {
      accessController: {
        write: ['*'],
      },
    } as any)
    db.events.on('replicated', () => {
      console.log(db)
    })
    await db.load()
    return db
  }
}
