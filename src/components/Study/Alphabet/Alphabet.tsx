import {Alphabet as AlphabetComponent} from '../../Alphabet/Alphabet'
import {LetterType} from '../../../utils'

export function Alphabet({alphabet}: {alphabet: LetterType[]}) {
    return <AlphabetComponent alphabet={alphabet} />
}
