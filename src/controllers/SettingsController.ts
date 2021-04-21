import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
  async index(req: Request, res: Response) {
    const settingsService = new SettingsService()
    const settings = await settingsService.find()

    res.json(settings)
  }

  async create(req: Request, res: Response) {
    const {chat,username} = req.body

    const settingsService = new SettingsService()
    const setting = await settingsService.create({ chat, username })
    
    res.status(201).json(setting)
  }
}

export { SettingsController }

