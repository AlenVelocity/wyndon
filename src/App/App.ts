/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events'
import http, { RequestListener } from 'http'
import parseurl from 'parseurl'
import finalhandler from 'finalhandler'
import getHost from './getHost'
import IncomingMessage from './IncomingMessage'
import './Types'
import { HandleFunction, NextFunction, NextHandleFunction } from './Types'
import call from './call'
import query from '../Middleware/query'
interface ServerStackItem {
    route: string
    handle: HandleFunction | http.Server
}
const defer =
    typeof setImmediate === 'function'
        ? setImmediate
        : function (fn: HandleFunction | (() => unknown)) {
              // eslint-disable-next-line prefer-rest-params
              process.nextTick(fn.bind.apply(fn as unknown as any, arguments as unknown as any))
          }

/**
 * Create a new wyndon server.
 */
export default class App extends EventEmitter {
    constructor() {
        super()
        this.use(query())
    }

    /**
     * Base Route
     */
    route = ''

    /**
     * Middleware stack
     */
    stack: ServerStackItem[] = []

    /**
     * Binds the given middleware to the app or the route if provided
     */
    use(fn: NextHandleFunction): this
    use(fn: HandleFunction): this
    use(route: string, fn: NextHandleFunction): this
    use(route: string, fn: HandleFunction): this
    use(route?: HandleFunction | string, fn?: HandleFunction): this {
        let handle: App | NextHandleFunction | undefined | HandleFunction = fn
        let path = route

        if (typeof route !== 'string') {
            handle = route
            path = '/'
        }

        if (typeof (handle as unknown as App).handle === 'function' && path) {
            const server = handle
            ;(server as unknown as App).route = path as string
            handle = (req: http.IncomingMessage, res: http.ServerResponse, next: HandleFunction) => {
                ;(server as unknown as App).handle(req, res, next)
            }
        }

        if (typeof path === 'string' && path[path.length - 1] === '/') path = path.slice(0, -1)

        this.stack.push({ route: path as string, handle: handle as HandleFunction })
        return this
    }

    /**
     * Base handler
     * @param req
     * @param res
     * @param out
     */
    handle(req: IncomingMessage, res: http.ServerResponse, out: HandleFunction): void {
        let index = 0
        const protohost = getHost(req.url || '')
        let removed = ''
        let slashAdded = false
        const stack = this.stack

        const done =
            out ||
            finalhandler(req, res, {
                env: process.env.NODE_ENV || 'devlopment',
                onerror: (err: Error) => (process.env.NODE_ENV === 'test' ? console.error(err.stack || err) : void null)
            })

        req.originalUrl = req.originalUrl || req.url
        const next: NextFunction = (err) => {
            if (slashAdded) {
                req.url = req?.url?.substr(1)
                slashAdded = false
            }

            if (removed.length !== 0) {
                req.url = protohost + removed + req?.url?.substr(protohost?.length || 0)
                removed = ''
            }

            const layer = stack[index++]

            if (!layer) return void defer(done as () => unknown, err as undefined)

            const path = parseurl(req)?.pathname || '/'
            const route = layer.route

            if (path.toLowerCase().substr(0, route.length) !== route.toLowerCase()) {
                return next(err)
            }

            const c = path.length > route.length && path[route.length]
            if (c && c !== '/' && c !== '.') {
                return next(err)
            }

            if (route.length !== 0 && route !== '/') {
                removed = route
                req.url = protohost || '' + req?.url?.substr((protohost?.length || 0) + removed.length || 0)

                if (!protohost && req.url[0] !== '/') {
                    req.url = '/' + req.url
                    slashAdded = true
                }
            }

            call(layer.handle, route, err, req, res, next)
        }

        next()
    }
    listen(port: number, hostname?: string, backlog?: number, callback?: HandleFunction): http.Server
    listen(port: number, hostname?: string, callback?: HandleFunction): http.Server
    listen(path: string, callback?: HandleFunction): http.Server
    listen(handle: unknown, listeningListener?: HandleFunction): http.Server
    listen(...args: any[]): http.Server {
        const server = http.createServer(((req: IncomingMessage, res: http.ServerResponse, next: HandleFunction) => {
            this.handle(req, res, next)
        }) as RequestListener)
        // eslint-disable-next-line prefer-spread
        return server.listen.apply(server, args as any)
    }
}
