import {useState, useRef, useCallback, useEffect} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType, getWordDataPath, routes} from '../../utils'
import {OnLetterClick} from '../Alphabet/Alphabet'
import {generatePath, useNavigate, useParams} from 'react-router-dom'

export function Study() {
    const {letter: upper} = useParams()
    const letter = alphabet.find(l => l.upper === upper)
    const [activeLetter, setActiveLetter] = useState<LetterType>(letter || alphabet[0])
    const navigate = useNavigate()

    useEffect(() => {
        navigate(generatePath(routes.abc, {letter: activeLetter.upper}))
    }, [activeLetter, navigate])

    const audio = useRef<HTMLAudioElement>(null)

    const onSlideChangeTransitionEnd = useCallback(() => {
        audio.current?.play()
    }, [])

    useEffect(() => {
        audio.current?.play()
    }, [])

    const onLetterClick: OnLetterClick = useCallback(
        letter => {
            const a = audio.current

            if (!a) return

            if (letter === activeLetter) {
                a.currentTime = 0
                a.play()
            } else {
                setActiveLetter(letter)
            }
        },
        [activeLetter]
    )

    return (
        <div className={s.study}>
            <Preview
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
                onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
                onLetterClick={onLetterClick}
            />
            <Alphabet
                alphabet={alphabet}
                activeLetter={activeLetter}
                onLetterClick={onLetterClick}
            />
            <audio
                ref={audio}
                preload="auto"
                src={getWordDataPath(activeLetter?.upper, `${activeLetter?.words[0]}.mp3`)}
            />
        </div>
    )
}
