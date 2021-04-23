import { Request, Response } from 'express'
import { SettingsService } from '../services/SettingsService'

class ViewsController {
  async client(req: Request, res: Response) {
    let { username } = req.query
    username = username ? String(username) : 'admin'
    let showChat = false

    const settingsServices = new SettingsService()

    const settings = await settingsServices.findByUsername({ username })

    if (typeof settings === 'object' && typeof settings.chat === 'boolean')
      showChat = settings.chat

    res.render('client.html', { showChat })
  }

  async admin(_: Request, res: Response) {
    res.render('admin.html')
  }
}

export { ViewsController }
