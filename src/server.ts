import express from 'express'
import morgan from 'morgan'
import './database'
import { routes } from './routes'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(routes)

app.listen(3333, () => console.log('Server is running on port 3333'))