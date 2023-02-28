import {getLetterPath} from './getLetterPath'

export function getLetterSoundPath(letter: string | undefined) {
    return getLetterPath(letter, `${letter}.mp3`)
}
