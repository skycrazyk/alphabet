import s from './Study.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Preview} from './Preview/Preview'

export function Study() {
    return (
        <div className={s.study}>
            <Preview />
            {/* <Alphabet /> */}
        </div>
    )
}
