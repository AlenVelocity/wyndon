import http from 'http'
export default interface ServerResponse extends http.ServerResponse {
    json(data: unknown): void
    render(filename?: string, options?: { [key: string]: unknown }, callback?: () => unknown): void
}
