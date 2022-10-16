import {LetterType, getWordDataPath} from '../../../../utils'
import s from './Slide.module.css'

export type OnLetterClick = (letter: LetterType) => void

export function Slide({
    letter,
    isActive,
    isVisible,
    onLetterClick,
}: {
    letter: LetterType
    isVisible: boolean
    isActive: boolean
    onLetterClick: OnLetterClick
}) {
    return (
        <div className={s.slide}>
            <div className={s.upper}>
                <button className={s.upperBtn} onClick={() => onLetterClick(letter)}>
                    {letter.upper}
                </button>
            </div>
            <div className={s.word}>{letter.words[0]}</div>
            <div className={s.image}>
                <img src={getWordDataPath(letter.upper, `${letter.words[0]}.webp`)} />
            </div>
        </div>
    )
}
