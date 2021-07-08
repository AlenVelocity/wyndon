import { existsSync } from 'fs'
import { resolve } from 'path'

export default class View {
    data: (unknown | null | Error)[]
    constructor(public engine?: string, public path = './views') {
        if (!engine) throw new Error('No engine provided')
        this.data = this.load(this.engine as string)
    }

    load = (mod: string): (unknown | null | Error)[] => {
        try {
            return [require(mod), null]
        } catch (err) {
            return [null, err as Error]
        }
    }

    render = (filename: string, options?: { [key: string]: unknown }): string | null => {
        if (!this.data[0]) throw this.data[1]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const engine = (this.data[0] as any).__wyndon || (this.data[0] as any).renderFile
        if (!engine) throw new Error(`Module ${this.engine} is not compatable with wyndon`)
        const absolute = resolve(this.path, filename)
        let data: string | null = null
        if (existsSync(absolute)) {
            engine(absolute, options, (err: Error | null, result: string) => {
                if (err) throw err
                data = result
            })
            return data
        }
        throw new Error(`Couldn't locate ${absolute}`)
    }
}
