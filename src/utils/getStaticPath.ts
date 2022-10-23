export function getStaticPath(path: string) {
    return `${process.env.PUBLIC_URL}${path}`
}
