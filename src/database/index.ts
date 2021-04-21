import { createConnection } from 'typeorm'

createConnection().then(c =>
  console.log('Database Connected')
)
