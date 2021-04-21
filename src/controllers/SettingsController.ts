import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SettingsRepository } from '../repositories/SettingsRepository'

class SettingsController {

  static async index(req: Request, res: Response) {
    const settingsRepository = getCustomRepository(SettingsRepository)

    const settings = await settingsRepository.find()

    res.json(settings)
  }

  static async create(req: Request, res: Response) {
    const {chat,username} = req.body
    const settingsRepository = getCustomRepository(SettingsRepository)

    const setting = settingsRepository.create({
      chat,
      username
    })

    await settingsRepository.save(setting)

    res.status(201).json(setting)
  }

}


export { SettingsController }

