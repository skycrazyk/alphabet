import React, {useCallback, useEffect, useRef, useState, DetailedHTMLProps, forwardRef} from 'react'

type Src = string | string[] | undefined

const initTrack = (src: Src) => (Array.isArray(src) ? 0 : src)

export function useAudio(src: Src, options?: {autoplay?: boolean}) {
    const [track, setTrack] = useState(() => initTrack(src))
    const [isCanPlay, setIsCanPlay] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    useEffect(() => {
        setTrack(initTrack(src))
    }, [src])

    const currentSrc = Array.isArray(src) ? src[track as number] : (track as string)

    useEffect(() => {
        setIsCanPlay(false)
    }, [currentSrc])

    const ref = useRef<HTMLAudioElement>(null)

    const play = useCallback(() => {
        if (ref.current) {
            ref.current.currentTime = 0
        }
        setTrack(initTrack(src))
        setIsPlaying(true)
    }, [src])

    const stop = useCallback(() => setIsPlaying(false), [])

    useEffect(() => {
        const audioRef = ref.current
        if (!audioRef) return

        const onloadstart = () => setIsCanPlay(false)
        const oncanplaythrough = () => setIsCanPlay(true)
        const onended = () => {
            if (typeof src === 'string' || (Array.isArray(src) && track === src.length - 1)) {
                // Если отыграл последний файл - останавливаем воспроизведение.
                // Cюда можно добавить логику по повторному воспроизведению и.т.д.
                setIsPlaying(false)
                setTrack(initTrack(src))
                return
            }

            if (src) {
                setTrack((track as number) + 1)
            }
        }
        audioRef.addEventListener('loadstart', onloadstart)
        audioRef.addEventListener('canplaythrough', oncanplaythrough)
        audioRef.addEventListener('ended', onended)

        return () => {
            audioRef.removeEventListener('loadstart', onloadstart)
            audioRef.removeEventListener('canplaythrough', oncanplaythrough)
            audioRef.removeEventListener('ended', onended)
        }
    }, [setTrack, src, track])

    useEffect(() => {
        if (!ref.current) return

        if (isPlaying && isCanPlay) {
            ref.current.currentTime = 0
            ref.current.play()
        }

        if (!isPlaying) {
            ref.current.pause()
        }
    }, [isPlaying, isCanPlay, track])

    return {
        props: {
            ref,
            src: currentSrc,
        },
        play,
        stop,
    }
}

export const Audio = forwardRef<HTMLAudioElement>(
    (
        props: DetailedHTMLProps<React.AudioHTMLAttributes<HTMLAudioElement>, HTMLAudioElement>,
        ref
    ) => <audio preload="auto" ref={ref} {...props} />
)
