const App = require('../../dist').default
const app = new App()

app.use((req, _res, next) => {
    console.log(`Request: ${req.url}`)
    next()
})
app.use('/well', (_req, res) => res.end('Well...'))

app.use('/', (req, res) => res.end(`Hello ${req.query.name || 'There'}! Welcome to Yet another web application framework!`))

app.listen(5000)

console.log('App is listening on post 5000')