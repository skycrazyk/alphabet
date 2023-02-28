import {parallelLimit, AsyncResultCallback} from 'async'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {
    alphabet,
    getLetterSoundPath,
    getLetterWordImagePath,
    getLetterWordSoundPath,
} from '../../utils'

// TODO оформить в виде хранилища
// let dataResp = await fetch('https://file-examples.com/storage/fe00fb1b6463fa60ca184a7/2017/11/file_example_MP3_700KB.mp3')
// let dataBlob = await dataResp.blob()
// let dataUrl = URL.createObjectURL(dataBlob)
const alphabetPaths = alphabet.reduce((acc, letter, idx) => {
    const letterSound = getLetterSoundPath(letter.upper)
    const wordsSounds = letter.words?.map(w => getLetterWordSoundPath(letter.upper, w))
    const wordsImages = letter.words?.map(w => getLetterWordImagePath(letter.upper, w))

    return [...acc, letterSound, ...(wordsSounds || []), ...(wordsImages || [])]
}, [] as string[])

console.log(alphabetPaths)

type Assets = Record<string, string>

export const assetsApi = createApi({
    reducerPath: 'assetsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: builder => ({
        fetchAssets: builder.query<Assets, void>({
            async queryFn() {
                const assets = (await parallelLimit([], 1)) as Assets

                return {data: assets}

                // return {
                //     error: {
                //         status: 500,
                //         statusText: 'Internal Server Error',
                //         data: "Coin landed on it's edge!",
                //     },
                // }
            },
        }),
    }),
})
