require('./db/mongoose')
const express = require('express')
const userRouter = require('./routers/user')
const goodRouter = require('./routers/good')
const goodsListRouter = require('./routers/goodsList')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(goodRouter)
app.use(goodsListRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})