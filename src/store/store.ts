import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query'
import {trainingSlice} from './reducers/training'
import {assetsApi} from './reducers/assets'

export const store = configureStore({
    reducer: {
        training: trainingSlice.reducer,
        [assetsApi.reducerPath]: assetsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(assetsApi.middleware),
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
