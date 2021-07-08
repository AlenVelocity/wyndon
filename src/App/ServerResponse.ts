import http from 'http'
export default interface ServerResponse extends http.ServerResponse {
    json(data: unknown): void
}
