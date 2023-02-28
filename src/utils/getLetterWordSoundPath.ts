import {getLetterPath} from './getLetterPath'

export function getLetterWordSoundPath(letter: string | undefined, word: string | undefined) {
    return getLetterPath(letter, `${letter}_${word}.mp3`)
}
