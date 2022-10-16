import {useNavigate, generatePath} from 'react-router-dom'
import s from './Home.module.css'
import {alphabet, routes} from '../../utils'

export function Home() {
    const navigate = useNavigate()
    return (
        <div className={s.home}>
            <button
                onClick={() => navigate(generatePath(routes.abc, {letter: alphabet[0].upper}))}
                className={s.start}
            >
                Старт
            </button>
        </div>
    )
}
