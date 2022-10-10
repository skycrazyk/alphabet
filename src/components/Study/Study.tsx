import {useState} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType} from '../../utils'

export function Study() {
    const [activeLetter, setActiveLetter] = useState<LetterType>()

    return (
        <div className={s.study}>
            <Preview
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
            />
            <Alphabet
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
            />
            <audio>
                <source
                    src={`/sounds/alphabet/${activeLetter?.upper}/${activeLetter?.words[0]}.mp3`}
                    type="audio/mpeg"
                />
            </audio>
        </div>
    )
}
