import { httpServer } from './http'
import './websockets/client'
import './websockets/admin'

httpServer.listen(process.env.PORT || 3333, () =>
  console.log('Server is running on port 3333')
)
