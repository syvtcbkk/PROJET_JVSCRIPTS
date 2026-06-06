import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import './db/connection.js'  // Lance la connexion au démarrage

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: ' Serveur FlipMind opérationnel' })
})

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`)
})