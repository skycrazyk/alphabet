import {useState, useRef, useCallback, useEffect} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType, getWordDataPath} from '../../utils'

export function Study() {
    const [activeLetter, setActiveLetter] = useState<LetterType>(alphabet[0])
    const audio = useRef<HTMLAudioElement>(null)

    const onSlideChangeTransitionEnd = useCallback(() => {
        audio.current?.play()
    }, [])

    useEffect(() => {
        audio.current?.play()
    }, [])

    return (
        <div className={s.study}>
            <Preview
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
                onSlideChangeTransitionEnd={onSlideChangeTransitionEnd}
            />
            <Alphabet
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
            />
            <audio
                ref={audio}
                preload="auto"
                src={getWordDataPath(activeLetter?.upper, `${activeLetter?.words[0]}.mp3`)}
            />
        </div>
    )
}
