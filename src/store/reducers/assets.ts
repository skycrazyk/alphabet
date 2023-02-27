import {parallelLimit, AsyncResultCallback} from 'async'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import type {LetterType} from '../../utils'
import {alphabet} from '../../utils'

type LetterAccet = Pick<LetterType, 'upper' | 'lower'> & {
    words: {
        text: string
        sound: Blob
        image: Blob
    }[]
}

type Assets = {
    alphabet: LetterAccet[]
}

export const assetsApi = createApi({
    reducerPath: 'assetsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: builder => ({
        getAssets: builder.query<Assets, void>({
            async queryFn(arg, api, extraOptions, baseQuery) {
                const assets = {} as Assets

                const alphabetRequests = alphabet.reduce((acc, letter, idx) => {
                    // const imageCb = () =>
                    return acc
                }, [] as ((cb: AsyncResultCallback<any>) => void)[])

                await parallelLimit([], 1)

                return {data: assets}
                // const randomVal = Math.random()
                // if (randomVal < 0.45) {
                //     return {data: 'heads'}
                // }
                // if (randomVal < 0.9) {
                //     return {data: 'tails'}
                // }
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
