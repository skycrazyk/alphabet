import {Dispatch, SetStateAction} from 'react'
import {Alphabet as AlphabetComponent} from '../../Alphabet/Alphabet'
import {LetterType} from '../../../utils'
import s from './Alphabet.module.css'

export function Alphabet({
    alphabet,
    activeLetter,
    setActiveLetter,
}: {
    alphabet: LetterType[]
    activeLetter: LetterType | undefined
    setActiveLetter: Dispatch<SetStateAction<LetterType>>
}) {
    return (
        <AlphabetComponent
            alphabet={alphabet}
            onLetterClick={setActiveLetter}
            activeLetter={activeLetter}
            alphabetClassName={s.list}
            letterClassName={s.item}
        />
    )
}
