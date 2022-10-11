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
    return (
        <div>
            <div className={s.upper}>{letter.upper}</div>
            <div className={s.word}>{letter.words[0]}</div>
            {/* <div className={s.image}></div> */}
        </div>
    )
}
