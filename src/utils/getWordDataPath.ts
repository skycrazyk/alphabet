export function getWordDataPath(letter: string | undefined, file: string | undefined) {
    return `${process.env.PUBLIC_URL}/alphabet/${letter}/${file}`
}
