import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import noteRoutes from './routes/noteRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI =
  'mongodb://localhost:27017/notesapp' || process.env.MONGODB_URI
const PORT = 5001 || process.env.PORT

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/notes', noteRoutes)

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
