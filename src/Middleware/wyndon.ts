import IncomingMessage from '../App/IncomingMessage'
import ServerResponse from '../App/ServerResponse'
import { NextFunction } from '../App'

export default () => {
    return (_req: IncomingMessage, res: ServerResponse, next: NextFunction): void => {
        res.setHeader('X-Powered-By', 'Wyndon')
        res.json = (data: unknown) => {
            res.writeHead(res.statusCode || 200, {
                'Content-Type': 'application/json'
            })
            res.end(JSON.stringify(data))
        }
        next()
    }
}
