import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {trainingSlice} from './reducers/training'

export const store = configureStore({
    reducer: {
        training: trainingSlice.reducer,
    },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
