import s from './App.module.css'
import {alphabet} from './alphabets'

function App() {
    const sound = new Audio('/sounds/alphabet/А/bell.mp3')

    return (
        <div className={s.list}>
            {alphabet.map(l => (
                <div key={l.upper} className={s.item} onClick={() => sound.play()}>
                    {l.upper}
                </div>
            ))}
        </div>
    )
}

export default App
