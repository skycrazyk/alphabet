import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'
import {alphabet} from '../../utils'

export function Study() {
    return (
        <div className={s.study}>
            <Preview alphabet={alphabet} />
            <Alphabet alphabet={alphabet} />
        </div>
    )
}
