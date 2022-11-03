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
                    className={cn(s.alphabet, s.btn)}
                >
                    Алфавит
                </button>
                <button
                    onClick={() => {
                        navigate(generatePath(routes.letter))
                    }}
                    className={cn(s.findLetter, s.btn)}
                >
                    Найди букву
                </button>
                {/* <button
                    onClick={() =>
                        navigate(generatePath(routes.train, {letter: alphabet[0].upper}))
                    }
                    className={cn(s.firstLetter, s.btn)}
                >
                    Первая буква
                </button> */}
            </div>
        </div>
    )
}
