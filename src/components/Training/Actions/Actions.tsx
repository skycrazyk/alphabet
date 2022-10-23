import cn from 'classnames'
import s from './Actions.module.css'

export function Actions() {
    return (
        <div className={s.actions}>
            <button className={cn(s.btn, s.question)}>
                <span>Вопрос</span>
            </button>
            <button className={cn(s.btn, s.accept)}>
                <span>Принять</span>
            </button>
        </div>
    )
}
