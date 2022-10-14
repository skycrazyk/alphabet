import {useNavigate} from 'react-router-dom'
import s from './Home.module.css'

export function Home() {
    const navigate = useNavigate()
    return (
        <div className={s.home}>
            <button onClick={() => navigate('study')} className={s.start}>
                Старт
            </button>
        </div>
    )
}
