import {LetterType} from '../../utils/alphabet'
import s from './Alphabet.module.css'
import {Letter} from './Letter/Letter'
import cn from 'classnames'

export type OnLetterClick = (letter: LetterType) => void

export function Alphabet({
    alphabet,
    activeLetter,
    onLetterClick,
    alphabetClassName,
    letterClassName,
    letterClassNameActive,
}: {
    alphabet: LetterType[]
    onLetterClick?: OnLetterClick
    alphabetClassName?: string
    letterClassName?: string
    letterClassNameActive?: string
    activeLetter?: LetterType
}) {
    return (
        <div className={cn(s.list, alphabetClassName)}>
            {alphabet.map(l => (
                <Letter
                    key={l.upper}
                    letter={l}
                    onClick={onLetterClick}
                    className={letterClassName}
                    classNameActive={letterClassNameActive}
                    isActive={activeLetter === l}
                />
            ))}
        </div>
    )
}
