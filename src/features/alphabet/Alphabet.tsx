import {alphabet} from './letters'
import s from './Alphabet.module.css'
import {Item} from './Item/Item'
import {useCallback, useEffect, useState} from 'react'

export function Alphabet() {
    const [audio, setAudio] = useState<HTMLAudioElement>()

    const onLetterClick = useCallback((letterAudio: HTMLAudioElement) => {
        setAudio(current => {
            current?.pause()
            return letterAudio
        })
    }, [])

    useEffect(() => {
        if (!audio) return
        audio.currentTime = 0
        audio.play()
    }, [audio])

    return (
        <div className={s.list}>
            {alphabet.map(l => (
                <Item key={l.upper} letter={l} onClick={onLetterClick} />
            ))}
        </div>
    )
}
