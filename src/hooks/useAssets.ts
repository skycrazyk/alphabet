import {
    alphabet,
    getLetterSoundPath,
    getLetterWordImagePath,
    getLetterWordSoundPath,
    getStaticPath,
} from '../utils'
import {accets} from '../store'
import {useCallback} from 'react'

const alphabetPaths = alphabet.reduce((acc, letter, idx) => {
    const letterSound = getLetterSoundPath(letter.upper)
    const wordsSounds = letter.words?.map(w => getLetterWordSoundPath(letter.upper, w))
    const wordsImages = letter.words?.map(w => getLetterWordImagePath(letter.upper, w))

    return [...acc, letterSound, ...(wordsSounds || []), ...(wordsImages || [])]
}, [] as string[])

export const questionAudioSrc = getStaticPath('/findletter/0.mp3')
export const mistakeAudioSrc = getStaticPath('/mistake/0.mp3')
export const successAudioSrc = getStaticPath('/success/2.mp3')

const allPaths = [...alphabetPaths, questionAudioSrc, mistakeAudioSrc, successAudioSrc]

export function useAssets() {
    const assetsData = accets.useFetchAssetsQuery(allPaths)
    const asset = useCallback((url: string) => assetsData.data?.[url], [assetsData.data])
    return {asset, ...assetsData}
}
