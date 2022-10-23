import {getStaticPath} from './getStaticPath'

export function getLetterPath(letter: string | undefined, file: string | undefined) {
    return getStaticPath(`/alphabet/${letter}/${file}`)
}
