import {useCallback, useEffect, useRef} from 'react'
import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Actions} from './Actions/Actions'
import {getStaticPath, getLetterPath} from '../../utils'
import {useAppSelector, training, useAppDispatch} from '../../store'

const questionAudioSrc = getStaticPath('/findletter/0.mp3')

export function Training() {
    const questionAudioRef = useRef<HTMLAudioElement>(null)
    const activeLetterAudioRef = useRef<HTMLAudioElement>(null)
    const activeLetter = useAppSelector(training.selectActiveLetter)
    const selectedLetter = useAppSelector(training.selectSelectedLetter)
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
    }, [])

    useEffect(() => {
        playQuestion()
    }, [playQuestion, activeLetter])

    const onAcceptClick = useCallback(() => {
        dispatch(training.check())
    }, [dispatch])

    return (
        <div className={s.wrap}>
            <Alphabet />
            <Actions
                onQuestionClick={playQuestion}
                onAcceptClick={onAcceptClick}
                selectedLetter={selectedLetter}
            />
            <audio ref={questionAudioRef} src={questionAudioSrc} preload="auto" />
            <audio
                ref={activeLetterAudioRef}
                src={getLetterPath(activeLetter?.upper, `${activeLetter?.upper}.mp3`)}
                preload="auto"
            />
        </div>
    )
}
