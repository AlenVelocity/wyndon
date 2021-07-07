import http from 'http'
import IncomingMessage from './IncomingMessage'

export type NextFunction = (err?: Error) => void
export type SimpleHandleFunction = (req: http.IncomingMessage, res: http.ServerResponse) => void
export type NextHandleFunction = (req: IncomingMessage, res: http.ServerResponse, next: NextFunction) => void
export type ErrorHandleFunction = (
    err: Error,
    req: IncomingMessage,
    res: http.ServerResponse,
    next: NextFunction
) => void
export type HandleFunction = SimpleHandleFunction | NextHandleFunction | ErrorHandleFunction
