import cn from 'classnames'
import {LetterType, getLetterPath} from '../../../../utils'
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
    const word = letter.words[0]?.split('')
    const firstEntranceIdx = word?.findIndex(l => l.toUpperCase() === letter.upper)
    return (
        <div className={s.slide}>
            <div className={s.upper}>
                <button className={s.upperBtn} onClick={() => onLetterClick(letter)}>
                    {letter.upper}
                </button>
            </div>
            <div className={s.word}>
                {word?.map((l, idx) => (
                    <span key={`${l}${idx}`} className={cn({[s.active]: idx === firstEntranceIdx})}>
                        {l}
                    </span>
                ))}
            </div>
            <div className={s.image}>
                <img src={getLetterPath(letter.upper, `${letter.words[0]}.webp`)} />
            </div>
        </div>
    )
}
