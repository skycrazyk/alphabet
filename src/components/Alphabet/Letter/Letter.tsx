import {useCallback} from 'react'
import cn from 'classnames'
import {LetterType} from '../../../utils/alphabet'
import s from './Letter.module.css'

export function Letter({
    letter,
    onClick,
    className,
    isActive,
}: {
    letter: LetterType
    onClick?: (letter: LetterType) => void
    className?: string
    isActive?: boolean
}) {
    // const audio = new Audio(`/sounds/alphabet/${letter.upper}/${letter.words[0]}.mp3`)
    const onClickHandler = useCallback(() => {
        onClick?.(letter)
    }, [letter, onClick])

    return (
        <div className={cn(s.item, {[s.active]: isActive}, className)} onClick={onClickHandler}>
            {letter.upper}
        </div>
    )
}
