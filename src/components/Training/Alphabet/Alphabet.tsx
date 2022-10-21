import {Alphabet as AlphabetComponent} from '../../Alphabet/Alphabet'
import {alphabet} from '../../../utils'
import s from './Alphabet.module.css'

export function Alphabet() {
    return (
        <AlphabetComponent
            alphabetClassName={s.list}
            letterClassName={s.item}
            alphabet={alphabet}
        />
    )
}
