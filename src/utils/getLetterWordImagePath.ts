import {getLetterPath} from './getLetterPath'

export function getLetterWordImagePath(letter: string | undefined, word: string | undefined) {
    return getLetterPath(letter, `${word}.webp`)
}
