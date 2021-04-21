import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {
  async create({ chat, username}: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const userAlreadyExists = await settingsRepository.findOne({where:{username}})

    if(!!userAlreadyExists) throw new Error('User already exists')

    const setting = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(setting)

    return setting
  }
}

export { SettingsService }
