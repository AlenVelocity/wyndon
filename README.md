# Wyndon 

## Minimalist Middleware Framework

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![NodeJs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/) [![z](https://img.shields.io/npm/dw/wyndon?style=for-the-badge&logoColor=white)](https://www.npmjs.com/package/wyndon)

[![Wyndon](https://nodei.co/npm/wyndon.png)](https://www.npmjs.com/package/wyndon)

Wydon is a Modern Middleware Framework for creating HTTP servers which supports _middleware_

## Why?
Why not?
# Installation
```sh
> npm i wyndon
```
# Usage
The following code shows the procedure to create a simple Server and binding it to a PORT
```TS
import { App } from 'wyndon'
// or const { App } = require('wyndon')

// Initialize App
const app = new App()
// Add your middleware
app.use((req, res, next) => {
    // Do stuff like logging and auth here
    next()
})

app.use('/', (req, res) => {
    // Write code
    res.end('This is a cool response')
})

app.use('/hi', (req, res) => {
    res.end('Hi. Cool endpoint, right?')
})


// Bind the App to a PORT
app.listen(process.env.PORT || 5000)

//Pofit!
```

## Routing

 If you want advanced routing, you can use the `Router` class

```TS
import { App, Router } from 'wyndon'

const app = new App()


// Every method returns the modified instance. So you can chain methods
const coolRouter = new Router()
    .use('/test', (req, res) => res.end('Working'))
    .use('/json', (req, res) => res.json({ key: 'value'}))
    .use((req, res) => 'Welcome to /route')

app.use('/route', coolRouter)


```
