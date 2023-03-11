import {parallelLimit, retry} from 'async'
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

type Assets = Record<string, string>

export const assetsApi = createApi({
    reducerPath: 'assetsApi',
    baseQuery: fetchBaseQuery({baseUrl: '/'}),
    endpoints: builder => ({
        fetchAssets: builder.query<Assets, string[]>({
            async queryFn(arg) {
                try {
                    const assets = await parallelLimit<[string, string], [string, string][], Error>(
                        arg.map(
                            p => fetchCb =>
                                retry(
                                    {
                                        times: 10,
                                        interval: retryCount => 100 * Math.pow(2, retryCount),
                                    },
                                    retryCb =>
                                        fetch(p)
                                            .then(res =>
                                                res
                                                    .blob()
                                                    .then(b => {
                                                        const url = URL.createObjectURL(b)
                                                        retryCb(null, [p, url])
                                                    })
                                                    .catch(e =>
                                                        fetchCb(new Error('Creating blob error'))
                                                    )
                                            )
                                            .catch(e => retryCb(new Error('Fetching error'))),
                                    fetchCb
                                )
                        ),
                        3
                    )

                    return {data: Object.fromEntries(assets)}
                } catch (e) {
                    return {
                        error: {
                            status: (e as any)?.status || 0,
                            statusText: (e as Error)?.message || 'Unknown error',
                            data: (e as Error)?.message || 'Unknown error',
                        },
                    }
                }
            },
        }),
    }),
})

export const {useFetchAssetsQuery, endpoints} = assetsApi
