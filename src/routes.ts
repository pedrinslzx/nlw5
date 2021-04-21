import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()

const settingsController = new SettingsController()

routes.get('/settings', settingsController.index)
routes.post('/settings', settingsController.create)

export { routes }
