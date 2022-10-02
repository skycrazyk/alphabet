import {Letter} from '../letters'
import s from './Item.module.css'

export function Item({
    letter,
    onClick,
}: {
    letter: Letter
    onClick: (letterAudio: HTMLAudioElement) => void
}) {
    const audio = new Audio(`/sounds/alphabet/${letter.upper}/${letter.words[0]}.mp3`)

    return (
        <div className={s.item} onClick={() => onClick(audio)}>
            {letter.upper}
        </div>
    )
}
