import {createSlice} from '@reduxjs/toolkit'
import {LetterType} from '../../utils'

export type LetterAccets = Pick<LetterType, 'upper' | 'lower'> & {
    words: {
        text: string
        file: Blob
    }[]
    image: Blob
}
