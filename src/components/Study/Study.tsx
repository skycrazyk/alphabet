import {useState, useCallback, useEffect, useMemo} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType, getLetterPath, routes} from '../../utils'
import {OnLetterClick} from '../Alphabet/Alphabet'
import {generatePath, useNavigate, useParams} from 'react-router-dom'
import {useAssets, useAudio, Audio} from '../../hooks'

export function Study() {
    const {letter: upper} = useParams<{letter: string}>()
    const letter = alphabet.find(l => l.upper === upper)
    const [activeLetter, setActiveLetter] = useState<LetterType>(letter || alphabet[0])
    const navigate = useNavigate()
    const {asset} = useAssets()
    const {play, props: audioProps} = useAudio(
        useMemo(
            () =>
                asset(
                    getLetterPath(
                        activeLetter?.upper,
                        `${activeLetter?.upper}_${activeLetter?.words[0]}.mp3`
                    )
                ),
            [activeLetter?.upper, activeLetter?.words, asset]
        )
    )

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

    useEffect(() => play(), [play])

    const onLetterClick: OnLetterClick = useCallback(
        letter => {
            if (letter === activeLetter) {
                play()
            } else {
                setActiveLetter(letter)
            }
        },
        [activeLetter, play]
    )

    return (
        <div className={s.study}>
            <Preview
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
                onSlideChangeTransitionEnd={play}
                onLetterClick={onLetterClick}
            />
            <Alphabet
                alphabet={alphabet}
                activeLetter={activeLetter}
                onLetterClick={onLetterClick}
            />
            <Audio {...audioProps} />
        </div>
    )
}
