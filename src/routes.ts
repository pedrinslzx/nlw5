import { Router } from 'express'
import { SettingsController } from './controllers/SettingsController'

const routes = Router()

routes.get('/settings', SettingsController.index)
routes.post('/settings', SettingsController.create)

export { routes }
