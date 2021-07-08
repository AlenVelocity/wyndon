# wyndon 

Minimalist Middleware Framework

![Wyndon](https://img.icons8.com/fluent/96/000000/server.png)

## Why?
Why not?

# Installation
```sh
> npm i wyndon
```
# Usage

```TS
import { App, Router } from 'wyndon'
// or const { App, Router } = require('wyndon')
/* or const wyndon = require('wyndon')
      const { App, Router } = wyndon
*/

// Initialize App
const app = new App()
const router = new Router()
// Add your middleware
app.use((req, res, next) => {
    // Do stuff like logging and auth here
    next()
})
app.use('/coolroute', router.use('/1', (req, res) => res.end('Welome to coolroute 1')).use((req, res) => res.end('Well...')))

app.use('/', (req, res) => {
    // Write code
    res.end('This is a cool response')
})

app.use('/hi', (req, res) => {
    res.end('Hi. Cool endpoint, right?')
})


// Make the app bind to a PORT
app.listen(process.env.PORT || 5000)

//Pofit!
