import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class SettingsController {
  async create(req: Request, res: Response) {
    try {
      const { chat, username } = req.body

      const service = new SettingsService()

      const setting = await service.create({ chat, username })

      res.status(201).json(setting)
    } catch (error) {
      res.status(400).json({ message: error.message })
    }
  }

  async findByUsername(req: Request, res: Response) {
    const { username } = req.params
    const service = new SettingsService()
    const setting = await service.findByUsername({ username })
    res
      .status(setting ? 200 : 404)
      .json(setting || { message: 'Not Found', chat: false })
  }

  async update(req: Request, res: Response) {
    const { username } = req.params
    const { chat } = req.body
    const service = new SettingsService()
    const setting = await service.update({ username, chat })
    res.json(setting)
  }
}

export { SettingsController }
