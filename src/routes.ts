import { Router } from 'express'
import { MessagesController } from './controllers/MessagesController'
import { SettingsController } from './controllers/SettingsController'
import { UsersController } from './controllers/UsersController'
import { ViewsController } from './controllers/ViewsController'

const routes = Router()

const settingsController = new SettingsController()
const usersController = new UsersController()
const messagesController = new MessagesController()
const viewsController = new ViewsController()

// Views
routes.get('/', viewsController.client)
routes.get('/admin', viewsController.admin)

// Settings
routes.post('/settings', settingsController.create)
routes.get('/settings/:username', settingsController.findByUsername)
routes.put('/settings/:username', settingsController.update)

// Users
routes.post('/users', usersController.create)

// Messages
routes.post('/messages', messagesController.create)
routes.get('/messages/:id', messagesController.showByUser)

export { routes }
