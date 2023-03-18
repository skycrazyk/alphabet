import {
    alphabet,
    getLetterSoundPath,
    getLetterWordImagePath,
    getLetterWordSoundPath,
} from '../utils'
import {accets} from '../store'
import {useCallback} from 'react'

const alphabetPaths = alphabet.reduce((acc, letter, idx) => {
    const letterSound = getLetterSoundPath(letter.upper)
    const wordsSounds = letter.words?.map(w => getLetterWordSoundPath(letter.upper, w))
    const wordsImages = letter.words?.map(w => getLetterWordImagePath(letter.upper, w))

    return [...acc, letterSound, ...(wordsSounds || []), ...(wordsImages || [])]
}, [] as string[])

const allPaths = [...alphabetPaths]

export function useAssets() {
    const assetsData = accets.useFetchAssetsQuery(allPaths)
    const asset = useCallback((url: string) => assetsData.data?.[url], [assetsData.data])
    return {asset, ...assetsData}
}
