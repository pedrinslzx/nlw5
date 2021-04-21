import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingsRepository'

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {
  private repository : SettingsRepository
  constructor() {
    this.repository = getCustomRepository(SettingsRepository)
  }

  async create({ chat, username }: ISettingsCreate) {
    const userAlreadyExists = await this.repository.findOne({ where: { username } })

    if (userAlreadyExists) throw new Error('User already exists')

    const setting = this.repository.create({
      chat,
      username
    })

    await this.repository.save(setting)

    return setting
  }
}

export { SettingsService }
