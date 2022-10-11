import {LetterType, getWordDataPath} from '../../../../utils'
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
        <div className={s.slide}>
            <div className={s.upper}>{letter.upper}</div>
            <div className={s.word}>{letter.words[0]}</div>
            <div className={s.image}>
                {/* eslint-disable-next-line jsx-a11y/alt-text */}
                <img src={getWordDataPath(letter.upper, `${letter.words[0]}.webp`)} />
            </div>
        </div>
    )
}
