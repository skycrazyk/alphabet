import {useCallback, useEffect, useRef, useState} from 'react'
import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Actions} from './Actions/Actions'
import {getStaticPath, getLetterPath} from '../../utils'
import {useAppSelector, training, useAppDispatch} from '../../store'
import {alphabet} from '../../utils'

function useMedia() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [isEnded, setIsEnded] = useState(false)

    const mediaRef = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        const media = mediaRef.current

        if (!media) return

        const onPlaying = () => {
            setIsPlaying(true)
            setIsEnded(false)
        }

        const onEnded = () => {
            setIsPlaying(false)
            setIsEnded(true)
        }

        media.addEventListener('playing', onPlaying)
        media.addEventListener('ended', onEnded)

        return () => {
            media.removeEventListener('playing', onPlaying)
            media.removeEventListener('ended', onEnded)
        }
    }, [])

    return [mediaRef, {isPlaying, isEnded}] as const
}

const questionAudioSrc = getStaticPath('/findletter/0.mp3')
const mistakeAudioSrc = getStaticPath('/mistake/0.mp3')

export function Training() {
    const [questionAudioRef] = useMedia()
    const [mistakeAudioRef] = useMedia()
    const [activeLetterAudioRef] = useMedia()
    const activeLetter = useAppSelector(training.selectActiveLetter)
    const selectedLetter = useAppSelector(training.selectSelectedLetter)
    const activeStep = useAppSelector(training.selectActiveStep)
    const dispatch = useAppDispatch()

    const playQuestion = useCallback(async () => {
        const questionRef = questionAudioRef.current
        const activeLetterRef = activeLetterAudioRef.current

        if (!questionRef || !activeLetterRef) return

        const onEnded = () => {
            questionRef.removeEventListener('ended', onEnded)
            activeLetterRef.play()
        }

        questionRef.pause()
        questionRef.currentTime = 0
        activeLetterRef.pause()
        activeLetterRef.currentTime = 0
        questionRef.addEventListener('ended', onEnded)
        questionRef.play()
    }, [questionAudioRef, activeLetterAudioRef])

    useEffect(() => {
        playQuestion()
    }, [playQuestion, activeLetter])

    const playMistake = useCallback(async () => {
        const mistakeRef = mistakeAudioRef.current

        if (!mistakeRef) return

        mistakeRef.pause()
        mistakeRef.currentTime = 0
        mistakeRef.addEventListener('ended', playQuestion)
        mistakeRef.play()
    }, [playQuestion, mistakeAudioRef])

    useEffect(() => {
        const mistakes = activeStep?.step?.mistakes

        if (mistakes) {
            playMistake()
        }
    }, [activeStep?.step?.mistakes, playMistake])

    const onAcceptClick = useCallback(() => {
        dispatch(training.check())
    }, [dispatch])

    useEffect(() => {
        dispatch(training.init(alphabet))
        return () => {
            dispatch(training.reset())
        }
    }, [dispatch])

    return (
        <div className={s.wrap}>
            <Alphabet />
            <Actions
                onQuestionClick={playQuestion}
                onAcceptClick={onAcceptClick}
                selectedLetter={selectedLetter}
            />
            <audio ref={mistakeAudioRef} src={mistakeAudioSrc} preload="auto" />
            <audio ref={questionAudioRef} src={questionAudioSrc} preload="auto" />
            <audio
                ref={activeLetterAudioRef}
                src={getLetterPath(activeLetter?.upper, `${activeLetter?.upper}.mp3`)}
                preload="auto"
            />
        </div>
    )
}
