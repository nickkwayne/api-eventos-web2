import express from 'express'
import eventRouter from './routers/eventRouter.js'
import enterpriseRouter from './routers/enterpriseRouter.js'

import cors from 'cors'
import { welcomeController } from './controllers/welcomeController.js'
import { notFoundController } from './controllers/notFoundController.js'
import { errorHandler } from './middlewares/errorHandler.js'




const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', welcomeController)
app.use('/events', eventRouter )
app.use('/enterprises', enterpriseRouter)

app.use('*', notFoundController)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Servidor está rodando em http:localhost:${port}`)
})