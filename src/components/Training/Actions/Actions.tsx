import cn from 'classnames'
import {LetterType} from '../../../utils'
import s from './Actions.module.css'

export function Actions({
    onQuestionClick,
    onAcceptClick,
    selectedLetter,
}: {
    onQuestionClick: () => void
    onAcceptClick: () => void
    selectedLetter: LetterType | undefined
}) {
    return (
        <div className={s.actions}>
            <button className={cn(s.btn, s.question)} onClick={onQuestionClick}>
                <span>Вопрос</span>
            </button>
            <button
                className={cn(s.btn, s.accept)}
                disabled={!selectedLetter}
                onClick={onAcceptClick}
            >
                <span>Принять</span>
            </button>
        </div>
    )
}
