import {Alphabet} from '../Alphabet/Alphabet'
import s from './FullScreenAlphabet.module.css'

export function FullScreenAlphabet() {
    return <Alphabet alphabetClassName={s.list} letterClassName={s.item} />
}
