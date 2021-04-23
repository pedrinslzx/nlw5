import { getCustomRepository } from 'typeorm'
import { Setting } from '../entities/Setting'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {
  private repository: SettingsRepository
  constructor() {
    this.repository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.repository.findOne({
      where: { username }
    })

    if (userAlreadyExists) throw new Error('User already exists')

    const setting = this.repository.create({
      chat,
      username
    })

    await this.repository.save(setting)

    return setting
  }

  async findByUsername({ username }: { username: string }) {
    return await this.repository.findOne({ where: { username } })
  }

  async update({
    username,
    chat
  }: {
    username: string
    chat: boolean
  }): Promise<Setting> {
    await this.repository
      .createQueryBuilder()
      .update()
      .where('username = :username', { username })
      .set({ chat })
      .execute()

    const user = await this.findByUsername({ username })

    return user
  }
}

export { SettingsService }
