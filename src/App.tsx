import s from './App.module.css'
import {alphabet} from './alphabets'

function App() {
    return (
        <div className={s.list}>
            {alphabet.map(l => (
                <div key={l.upper} className={s.item}>
                    {l.upper}
                </div>
            ))}
        </div>
    )
}

export default App
