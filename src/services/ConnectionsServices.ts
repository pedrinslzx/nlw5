import { getCustomRepository } from 'typeorm'
import { ConnectionsRepository } from '../repositories/ConnectionsRepository'

interface IConnectionCreate {
  user_id: string
  socket_id: string
  admin_id?: string
}

class ConnectionsService {
  private repository: ConnectionsRepository

  constructor() {
    this.repository = getCustomRepository(ConnectionsRepository)
  }

  async create({ admin_id, socket_id, user_id }: IConnectionCreate) {
    const connectionExists = await this.repository.findOne({
      where: { user_id }
    })
    if (connectionExists) {
      const newConnection = {
        ...connectionExists,
        admin_id,
        socket_id,
        user_id
      }
      await this.repository.save(newConnection)
      return newConnection
    }

    const connection = this.repository.create({
      user_id,
      socket_id,
      admin_id
    })

    await this.repository.save(connection)

    return connection
  }

  async find() {
    const connections = await this.repository.find()
    return connections
  }

  async findAllWithoutAdmin() {
    const connections = await this.repository.find({
      where: { admin_id: null },
      relations: ['user']
    })
    return connections.filter((c) => !!c.socket_id)
  }

  async remove({ user_id }: Pick<IConnectionCreate, 'user_id'>) {
    const connection = await this.repository.findOne({ where: { user_id } })
    await this.repository.remove(connection)
  }

  async findByUserID({ user_id }: Pick<IConnectionCreate, 'user_id'>) {
    const connection = await this.repository.findOne({ where: { user_id } })
    return connection
  }

  async findBySocketID({ socket_id }: Pick<IConnectionCreate, 'socket_id'>) {
    const connection = await this.repository.findOne({ where: { socket_id } })
    return connection
  }

  async updateAdminID({
    user_id,
    admin_id
  }: {
    admin_id: string
    user_id: string
  }) {
    await this.repository
      .createQueryBuilder()
      .update()
      .where('user_id = :user_id', { user_id })
      .set({ admin_id })
      .execute()

    const user = await this.findByUserID({ user_id })

    return user
  }

  async removeAdmin({ admin_id }: { admin_id: string }) {
    await this.repository
      .createQueryBuilder()
      .update()
      .where('admin_id = :admin_id', { admin_id })
      .set({ admin_id: null })
      .execute()
  }

  async removeUserSocket({ socket_id }: { socket_id: string }) {
    await this.repository
      .createQueryBuilder()
      .update()
      .where('socket_id = :socket_id', { socket_id })
      .set({ socket_id: null, admin_id: null })
      .execute()
  }
}

export { ConnectionsService }
