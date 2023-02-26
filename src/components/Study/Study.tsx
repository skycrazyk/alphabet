import {useState, useRef, useCallback, useEffect} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType, getLetterPath, routes} from '../../utils'
import {OnLetterClick} from '../Alphabet/Alphabet'
import {generatePath, useNavigate, useParams} from 'react-router-dom'

export function Study() {
    const {letter: upper} = useParams<{letter: string}>()
    const letter = alphabet.find(l => l.upper === upper)
    const [activeLetter, setActiveLetter] = useState<LetterType>(letter || alphabet[0])
    const navigate = useNavigate()

    useEffect(() => {
        if (activeLetter.upper !== upper) {
            navigate(generatePath(routes.abc, {letter: activeLetter.upper}))
        }
    }, [activeLetter])

    useEffect(() => {
        if (activeLetter.upper !== upper) {
            const nextLetter = alphabet.find(l => l.upper === upper)
            if (nextLetter) {
                setActiveLetter(nextLetter)
            }
        }
    }, [upper])

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
                src={getLetterPath(
                    activeLetter?.upper,
                    `${activeLetter?.upper}_${activeLetter?.words[0]}.mp3`
                )}
            />
        </div>
    )
}
