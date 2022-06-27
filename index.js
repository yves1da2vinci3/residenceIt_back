// importation de modules
import express from 'express'
import cors from 'cors'

import ConnectDB  from "./config/connectDb.js"
// importation des routes
import RequestRoutes from './routes/RequestRoutes.js'
import UserRoutes from './routes/UserRoutes.js'
import ResidencetRoutes from './routes/ResidenceRoutes.js'

// parametrage du serveur
const app = express()
const PORT = process.env.PORT || 5000;
app.use(cors({
    origin: ['https://residenceit.netlify.app/','https://www.residenceit.com/','http://192.168.1.6:3000'],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Headers',
        'Origin',
        'sessionId',
    ],
    credentials: true,
}))

// * pemettre le json dns les requets
app.use(express.json())

// * definition des ressources pour les API
app.use("/api/residences",ResidencetRoutes)
app.use("/api/users",UserRoutes)
app.use('/api/requests',RequestRoutes)











// connection de la DB 
ConnectDB()











app.listen(PORT,()=>{
    console.log('express run effectly on port 5000')
})