import {useCallback} from 'react'
import cn from 'classnames'
import {LetterType} from '../../../utils/alphabet'
import s from './Letter.module.css'

export function Letter({
    letter,
    onClick,
    className,
    classNameActive,
    isActive,
}: {
    letter: LetterType
    onClick?: (letter: LetterType) => void
    className?: string
    classNameActive?: string
    isActive?: boolean
}) {
    const onClickHandler = useCallback(() => {
        onClick?.(letter)
    }, [letter, onClick])

    return (
        <div
            className={cn(s.item, {[s.active]: isActive}, className, {
                [classNameActive!]: isActive && classNameActive,
            })}
            onClick={onClickHandler}
        >
            {letter.upper}
        </div>
    )
}
