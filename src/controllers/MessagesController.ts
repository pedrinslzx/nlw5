import { Request, Response } from 'express'
import { MessagesService } from '../services/MessagesService'

class MessagesController {
  async create(req: Request, res: Response) {
    const { admin_id, text, user_id } = req.body

    const service = new MessagesService()

    const message = await service.create({ admin_id, text, user_id })

    return res.json(message)
  }

  async showByUser(req: Request, res: Response) {
    const { id } = req.params

    const service = new MessagesService()

    const message = await service.listByUser(id)

    return res.json(message)
  }
}
export { MessagesController }
