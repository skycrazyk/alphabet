import {Alphabet as AlphabetComponent, OnLetterClick} from '../../Alphabet/Alphabet'
import {LetterType} from '../../../utils'
import s from './Alphabet.module.css'

export function Alphabet({
    alphabet,
    activeLetter,
    onLetterClick,
}: {
    alphabet: LetterType[]
    activeLetter: LetterType | undefined
    onLetterClick: OnLetterClick
}) {
    return (
        <AlphabetComponent
            alphabet={alphabet}
            onLetterClick={onLetterClick}
            activeLetter={activeLetter}
            alphabetClassName={s.list}
            letterClassName={s.item}
        />
    )
}
