import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const {chat,username} = req.body

      const settingsService = new SettingsService()
      const setting = await settingsService.create({ chat, username })
      
      res.status(201).json(setting)
    } catch (error) {
      res.status(400).json({message: error.message})
    }
  }
}

export { SettingsController }

