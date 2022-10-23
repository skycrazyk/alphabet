import {useCallback} from 'react'
import {Alphabet as AlphabetComponent} from '../../Alphabet/Alphabet'
import s from './Alphabet.module.css'
import {useAppSelector, useAppDispatch, training} from '../../../store'
import {LetterType} from '../../../utils'

export function Alphabet() {
    const alphabet = useAppSelector(training.selectAlphabet)
    const selectedLetter = useAppSelector(training.selectSelectedLetter)
    const dispatch = useAppDispatch()
    const onLetterClick = useCallback(
        (letter: LetterType) => dispatch(training.setSelectLetter(letter)),
        [dispatch]
    )

    return (
        <AlphabetComponent
            alphabetClassName={s.list}
            letterClassName={s.item}
            alphabet={alphabet}
            activeLetter={selectedLetter}
            onLetterClick={onLetterClick}
        />
    )
}
