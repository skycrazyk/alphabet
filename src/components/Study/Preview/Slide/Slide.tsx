import {LetterType} from '../../../../utils'
import s from './Slide.module.css'

export function Slide({
    letter,
    isActive,
    isVisible,
}: {
    letter: LetterType
    isVisible: boolean
    isActive: boolean
}) {
    return <div className={s.upper}>{letter.upper}</div>
}
