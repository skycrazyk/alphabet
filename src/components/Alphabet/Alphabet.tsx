import {LetterType} from '../../utils/alphabet'
import s from './Alphabet.module.css'
import {Letter} from './Letter/Letter'
import cn from 'classnames'

export function Alphabet({
    alphabet,
    activeLetter,
    onLetterClick,
    alphabetClassName,
    letterClassName,
}: {
    alphabet: LetterType[]
    onLetterClick?: (letter: LetterType) => void
    alphabetClassName?: string
    letterClassName?: string
    activeLetter?: LetterType
}) {
    // const [audio, setAudio] = useState<HTMLAudioElement>()

    // const onLetterClick = useCallback((letterAudio: HTMLAudioElement) => {
    //     setAudio(current => {
    //         current?.pause()
    //         return letterAudio
    //     })
    // }, [])

    // useEffect(() => {
    //     if (!audio) return
    //     audio.currentTime = 0
    //     audio.play()
    // }, [audio])

    return (
        <div className={cn(s.list, alphabetClassName)}>
            {alphabet.map(l => (
                <Letter
                    key={l.upper}
                    letter={l}
                    onClick={onLetterClick}
                    className={letterClassName}
                    isActive={activeLetter === l}
                />
            ))}
        </div>
    )
}
