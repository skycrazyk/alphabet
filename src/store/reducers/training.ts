import {createSlice, PayloadAction, createSelector} from '@reduxjs/toolkit'
import {LetterType} from '../../utils'
import type {RootState} from '../store'

type Step = {
    mistakes: number
}

type Training = {
    finish: boolean
    errorsMaxCount: number
    activeLetter?: LetterType
    alphabet: LetterType[]
    progress: Step[]
}

const initialState: Training = {
    finish: false,
    errorsMaxCount: 1,
    progress: [],
    alphabet: [],
}

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        init(state, action: PayloadAction<LetterType[]>) {
            state.alphabet = action.payload
            state.activeLetter = action.payload[0]
        },
        next(state) {
            const activeIndex = state.alphabet.indexOf(state.activeLetter!)

            if (activeIndex === -1) return

            if (activeIndex === state.alphabet.length - 1) {
                state.finish = true
                return
            }

            state.activeLetter = state.alphabet[activeIndex + 1]
        },
        mistake(state) {
            const activeIndex = state.alphabet.indexOf(state.activeLetter!)

            if (activeIndex === -1) return

            const activeStep = state.progress[activeIndex] || {mistakes: 0}

            activeStep.mistakes += 1
            state.progress[activeIndex] = activeStep

            if (activeStep.mistakes < state.errorsMaxCount) return

            this.next(state)
        },
        check(state, action: PayloadAction<LetterType>) {
            if (action.payload === state.activeLetter) {
                this.next(state)
            } else {
                this.mistake(state)
            }
        },
    },
})

export const {mistake, init, next} = trainingSlice.actions

export const selectProgress = createSelector(
    (state: RootState) => state.training.alphabet,
    (state: RootState) => state.training.activeLetter,
    (state: RootState) => state.training.progress,
    (state: RootState) => state.training.errorsMaxCount,
    (alphabet, activeLetter, progress, errorsMaxCount) => {
        let activeIndex = -1

        const computedProgress = alphabet.map((letter, index) => {
            const step = progress[index]
            const isMistakes = !!step?.mistakes
            const isPass = step?.mistakes < errorsMaxCount
            const isFail = !isPass
            const isActive = letter === activeLetter
            const isDirty = activeIndex === -1
            const isSuccess = isDirty && !isMistakes

            if (isActive) activeIndex = index

            return {
                isMistakes,
                isPass,
                isFail,
                isActive,
                isDirty,
                isSuccess,
                letter,
            }
        })

        return computedProgress
    }
)
