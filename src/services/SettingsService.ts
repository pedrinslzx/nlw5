import { getCustomRepository } from "typeorm"
import { SettingsRepository } from "../repositories/SettingsRepository"

interface ISettingsCreate {
  chat: boolean
  username: string
}

class SettingsService {
  async create({ chat, username}: ISettingsCreate) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const setting = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(setting)

    return setting
  }


  async find(){
    const settingsRepository = getCustomRepository(SettingsRepository)

    const settings = await settingsRepository.find()

    return settings
  }
}

export { SettingsService }
