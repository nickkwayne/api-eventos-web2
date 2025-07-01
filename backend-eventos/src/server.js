import express from 'express'
import userRouter from './routers/userRouter.js'
import eventRouter from './routers/eventRouter.js'
import enterpriseRouter from './routers/enterpriseRouter.js'
import groupRouter from './routers/groupRouter.js'


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
app.use('/users', userRouter)
app.use('/groups', groupRouter)
app.use('*', notFoundController)
app.use(errorHandler)


app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`)
})