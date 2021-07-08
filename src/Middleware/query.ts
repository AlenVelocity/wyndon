import IncomingMessage from '../App/IncomingMessage'
import parseurl from 'parseurl'
import qs from 'qs'
import { ServerResponse } from 'http'
import { NextFunction } from '../App'

export default () => {
    return (req: IncomingMessage, res: ServerResponse, next: NextFunction): void => {
        if (!req.query) {
            req.query = qs.parse(parseurl(req)?.query as string, { allowPrototypes: true })
        }

        next()
    }
}
