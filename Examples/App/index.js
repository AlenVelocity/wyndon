const wyndon = require('../../dist')
const app = new wyndon.App()

app.use((req, _res, next) => {
    console.log({ request: req.url, query: req.query })
    next()
})

const apiRouter = new wyndon.Router()
    .use('/test', (_req, res) => res.end('Working!'))
    .use('/math', (req, res) => {
        let { x, y } = req?.query || { x: 0, y: 0}
        x = parseFloat(x) || 0
        y = parseFloat(y) || 0 
        let result = `${x} {O} ${y} = {R}`
        switch(req.query.method) {
            case 'add':
                return void res.end(result.replace('{O}', '+').replace('{R}', x + y ))
            case 'sub':
                return void res.end(result.replace('{O}', '-').replace('{R}', x - y ))
            case 'multiply':
                return void res.end(result.replace('{O}', '*').replace('{R}', x * y ))
            case 'divide':
                return void res.end(result.replace('{O}', '/').replace('{R}', x / y ))
            default: 
                return void res.end('Invalid Method')
        }
    })
    .use((_req, res) => res.end('APIs are Cool!'))

app.use('/api', apiRouter)

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