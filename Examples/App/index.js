const App = require('../../dist').default
const app = new App()

app.use((req, _res, next) => {
    console.group({ request: req.url, query: req.query })
    next()
})

app.use('/well', (_req, res) => res.end('Well...'))

app.use('/json', (req, res) => {
    res.writeHead(200, {
        "Content-Type": "application/json"
    })
    res.end(JSON.stringify({
        string: 'Hi!',
        number: 1,
        boolean: true,
        null: null,
        array: [1, 2, 3],
        object: {
            key: 'value'
        }
    }))
})

app.use('/', (req, res) => res.end(`Hello ${req.query.name || 'There'}! Welcome to Yet another web application framework!`))

app.listen(5000)

console.log('App is listening on post 5000')