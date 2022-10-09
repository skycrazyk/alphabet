import {Dispatch, SetStateAction} from 'react'
import {Alphabet as AlphabetComponent} from '../../Alphabet/Alphabet'
import {LetterType} from '../../../utils'

export function Alphabet({
    alphabet,
    activeLetter,
    setActiveLetter,
}: {
    alphabet: LetterType[]
    activeLetter: LetterType | undefined
    setActiveLetter: Dispatch<SetStateAction<LetterType | undefined>>
}) {
    return (
        <AlphabetComponent
            alphabet={alphabet}
            onLetterClick={setActiveLetter}
            activeLetter={activeLetter}
        />
    )
}
