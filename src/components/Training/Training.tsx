import {Alphabet} from '../Alphabet/Alphabet'
import {alphabet} from '../../utils'
import s from './Training.module.css'

export function Training() {
    return <Alphabet alphabetClassName={s.list} letterClassName={s.item} alphabet={alphabet} />
}
