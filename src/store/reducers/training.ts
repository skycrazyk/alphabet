import {createSlice, PayloadAction, createSelector, original} from '@reduxjs/toolkit'
import type {LetterType} from '../../utils'
import type {RootState} from '../store'

type Step = {
    mistakes: number
}

type Training = {
    finish: boolean
    errorsMaxCount: number
    activeLetter?: LetterType
    selectedLetter?: LetterType
    alphabet: LetterType[]
    progress: Step[]
}

const initialState: Training = {
    finish: false,
    errorsMaxCount: 1,
    progress: [],
    alphabet: [],
}

const redusers = {
    next(state: Training) {
        const origState = original(state)
        const activeIndex = origState!.alphabet.indexOf(origState!.activeLetter!)

        if (activeIndex === -1) return

        if (activeIndex === origState!.alphabet.length - 1) {
            state.finish = true
            return
        }

        state.activeLetter = origState!.alphabet[activeIndex + 1]
    },
    mistake(state: Training) {
        const origState = original(state)
        const activeIndex = origState!.alphabet.indexOf(origState!.activeLetter!)

        if (activeIndex === -1) return

        const activeStep = state.progress[activeIndex] || {mistakes: 0}

        activeStep.mistakes += 1
        state.progress[activeIndex] = activeStep

        if (activeStep.mistakes <= state.errorsMaxCount) return

        redusers.next(state)
    },
    resetSelectedLetter(state: Training) {
        state.selectedLetter = undefined
    },
}

export const trainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
        init(state, action: PayloadAction<LetterType[]>) {
            state.alphabet = action.payload
            state.activeLetter = action.payload[0]
        },
        next: redusers.next,
        mistake: redusers.mistake,
        check(state) {
            const origState = original(state)
            if (origState!.selectedLetter === origState!.activeLetter) {
                redusers.next(state)
            } else {
                redusers.mistake(state)
            }
            redusers.resetSelectedLetter(state)
        },
        setSelectedLetter(state, action: PayloadAction<LetterType>) {
            state.selectedLetter = action.payload
        },
        resetSelectedLetter: redusers.resetSelectedLetter,
    },
})

export const {mistake, init, next, check, setSelectedLetter, resetSelectedLetter} =
    trainingSlice.actions

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
                step,
            }
        })

        return computedProgress
    }
)

export const selectActiveStep = createSelector(selectProgress, progress =>
    progress.find(s => s.isActive)
)

export const selectAlphabet = createSelector(
    (state: RootState) => state.training.alphabet,
    alphabet => alphabet
)

export const selectSelectedLetter = createSelector(
    (state: RootState) => state.training.selectedLetter,
    selectedLetter => selectedLetter
)

export const selectActiveLetter = createSelector(
    (state: RootState) => state.training.activeLetter,
    activeLetter => activeLetter
)
