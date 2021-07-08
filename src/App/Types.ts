import http from 'http'
import IncomingMessage from './IncomingMessage'
import ServerResponse from './ServerResponse'
export type NextFunction = (err?: Error) => void
export type SimpleHandleFunction = (req: http.IncomingMessage, res: ServerResponse) => void
export type NextHandleFunction = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void
export type ErrorHandleFunction = (err: Error, req: IncomingMessage, res: ServerResponse, next: NextFunction) => void
export type HandleFunction = SimpleHandleFunction | NextHandleFunction | ErrorHandleFunction
