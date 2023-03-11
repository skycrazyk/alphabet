import {
    alphabet,
    getLetterSoundPath,
    getLetterWordImagePath,
    getLetterWordSoundPath,
} from '../utils'
import {accets} from '../store'

const alphabetPaths = alphabet.reduce((acc, letter, idx) => {
    const letterSound = getLetterSoundPath(letter.upper)
    const wordsSounds = letter.words?.map(w => getLetterWordSoundPath(letter.upper, w))
    const wordsImages = letter.words?.map(w => getLetterWordImagePath(letter.upper, w))

    return [...acc, letterSound, ...(wordsSounds || []), ...(wordsImages || [])]
}, [] as string[])

const allPaths = [...alphabetPaths]

export function useLoadAccets() {
    return accets.useFetchAssetsQuery(allPaths)
}

export function useAccetUrl(path: string) {
    const {data} = accets.useFetchAssetsQuery(allPaths)
    return data?.[path] ?? ''
}
