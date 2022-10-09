import {useState} from 'react'
import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet, LetterType} from '../../utils'

export function Study() {
    const [activeLetter, setActiveLetter] = useState<LetterType>()

    return (
        <div className={s.study}>
            <Preview alphabet={alphabet} />
            <Alphabet
                alphabet={alphabet}
                activeLetter={activeLetter}
                setActiveLetter={setActiveLetter}
            />
        </div>
    )
}
