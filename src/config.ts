import express from 'express'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'

import { errorHandler } from './middlewares/errorHandler'

import './db/config'

const app = express()

// Settings
app.set('PORT', process.env.PORT || 3000)


// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL?.toString(),
    credentials: true
  })
)
app.set('trust proxy', true)
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))

// routes
import authRoutes from './modules/auth/routes'
import codeRoutes from './modules/codes/routes'
import placeRoutes from './modules/user/routes'

app.use('/api/v1', authRoutes)
app.use('/api/v1', codeRoutes)
app.use('/api/v1', placeRoutes)

app.use(errorHandler)

export default app
