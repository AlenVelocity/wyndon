const getHost = (url: string): string | undefined => {
    if (url.length === 0 || url[0] === '/') return undefined
    const fqdnIndex = url.indexOf('://')
    return fqdnIndex !== -1 && url.lastIndexOf('?', fqdnIndex) === -1
        ? url.substr(0, url.indexOf('/', 3 + fqdnIndex))
        : undefined
}

export default getHost
