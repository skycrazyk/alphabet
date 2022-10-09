import {Alphabet} from '../Alphabet/Alphabet'
import {alphabet} from '../../utils'
import s from './FullScreenAlphabet.module.css'

export function FullScreenAlphabet() {
    return <Alphabet alphabetClassName={s.list} letterClassName={s.item} alphabet={alphabet} />
}
