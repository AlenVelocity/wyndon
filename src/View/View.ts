import { existsSync } from 'fs'
import { resolve } from 'path'
export default class View {
    engine: (unknown | null | Error)[] | undefined
    constructor(public mod?: string, public path = './views') {
    }

    load = (): void => {
        if (!this.mod) throw new Error('Module should be set before loading')
        this.engine = this._load(this.mod)
    }
    /**
     *
     * @param mod - module to load
     * Officially supported: [EJS](https://www.npmjs.com/package/ejs), [Pug](https://www.npmjs.com/package/pug)
     * @returns
     */
    private _load = (mod: string): (unknown | null | Error)[] => {
        try {
            return [require(mod), null]
        } catch (err) {
            return [null, err as Error]
        }
    }

    /**
     * Manually set the render engine
     * @param {engine} object to set as the view engine
     * @returns
     */
    // eslint-disable-next-line
    set = (engine: any): this => {
        if (!engine.__wyndon && !engine.renderFile) throw new Error("The given object can't be used as a view engine")
        this.engine = [engine, null]
        return this
    }

    render = (filename: string, options?: { [key: string]: unknown }): string | null => {
        if (!this.engine) throw new Error('Engine not set')
        if (!this.engine[0]) throw this.engine[1]
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const engine = (this.engine[0] as any).__wyndon || (this.engine[0] as any).renderFile
        if (!engine) throw new Error(`Module ${this.mod} is not compatable with wyndon`)
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
