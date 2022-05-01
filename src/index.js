import Express from 'express'
import bodyParser from 'body-parser'

import database from './config/database'

import toolRoute from './routes/toolRoute'

const app = Express()
const port = 3000||process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.set('json spaces', 2);

toolRoute(app)

app.get('/', (req, res) => res.send('Olá mundo pelo Express!'))

database.connect().then(() => {
    app.listen(port, () => console.log(`Api rodando na porta ${port}`))
})