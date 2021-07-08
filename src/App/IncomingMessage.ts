import http from 'http'
import { ParsedQs } from 'qs'
export default interface IncomingMessage extends http.IncomingMessage {
    originalUrl?: IncomingMessage['url']
    query?: ParsedQs
}
