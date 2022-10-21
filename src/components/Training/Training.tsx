import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Accept} from './Accept/Accept'

export function Training() {
    return (
        <div className={s.wrap}>
            <Alphabet />
            <Accept />
        </div>
    )
}
