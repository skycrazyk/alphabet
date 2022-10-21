import {useNavigate, generatePath} from 'react-router-dom'
import cn from 'classnames'
import s from './Home.module.css'
import {alphabet, routes} from '../../utils'

export function Home() {
    const navigate = useNavigate()
    return (
        <div className={s.home}>
            <div className={s.menu}>
                <button
                    onClick={() => navigate(generatePath(routes.abc, {letter: alphabet[0].upper}))}
                    className={cn(s.start, s.btn)}
                >
                    Знакомство
                </button>
                <button
                    onClick={() => navigate(generatePath(routes.abc, {letter: alphabet[0].upper}))}
                    className={cn(s.training, s.btn)}
                >
                    Тренировка
                </button>
            </div>
        </div>
    )
}
