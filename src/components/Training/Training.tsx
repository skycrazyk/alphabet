import {useCallback, useEffect, useRef} from 'react'
import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Actions} from './Actions/Actions'
import {getStaticPath, getLetterPath} from '../../utils'
import {useAppSelector, training} from '../../store'

const questionAudioSrc = getStaticPath('/findletter/0.mp3')

export function Training() {
    const questionAudioRef = useRef<HTMLAudioElement>(null)
    const activeLetterAudioRef = useRef<HTMLAudioElement>(null)
    const activeLetter = useAppSelector(training.selectActiveLetter)

    const playQuestion = useCallback(async () => {
        const onEnded = () => {
            activeLetterAudioRef.current?.play()
            questionAudioRef.current?.removeEventListener('ended', onEnded)
        }
        questionAudioRef.current?.addEventListener('ended', onEnded)
        questionAudioRef.current?.play()
    }, [])

    useEffect(() => {
        playQuestion()
    }, [playQuestion])

    return (
        <div className={s.wrap}>
            <Alphabet />
            <Actions />
            <audio ref={questionAudioRef} src={questionAudioSrc} preload="auto" />
            <audio
                ref={activeLetterAudioRef}
                src={getLetterPath(activeLetter?.upper, `${activeLetter?.upper}.mp3`)}
                preload="auto"
            />
        </div>
    )
}
