/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { IncomingMessage, ServerResponse } from 'http'
import { NextFunction } from './Types'

const call = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handle: any,
    _route: string,
    err: Error | undefined,
    req: IncomingMessage,
    res: ServerResponse,
    next: NextFunction
): void => {
    const arity = handle?.length
    let error = err
    const hasError = Boolean(err)

    try {
        if (hasError && arity === 4) {
            handle(err, req, res, next)
            return
        } else if (!hasError && arity < 4) {
            handle(req, res, next)
            return
        }
    } catch (e) {
        error = e as Error
    }

    next(error)
}

export default call
