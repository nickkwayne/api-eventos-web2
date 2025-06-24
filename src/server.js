import express from 'express'
import eventRouter from './routers/eventRouter.js'
import enterpriseRouter from './routers/enterpriseRouter.js'

import cors from 'cors'

const app = express()
const port = 3000


app.use(cors())
app.use(express.json())

app.use('/events', eventRouter )
app.use('/enterprises', enterpriseRouter)

app.listen(port, () => {
    console.log(`Servidor está rodando em http:localhost:${port}`)
})