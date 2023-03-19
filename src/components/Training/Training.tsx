import {useCallback, useEffect, useMemo} from 'react'
import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Actions} from './Actions/Actions'
import {getLetterPath, shuffle} from '../../utils'
import {useAppSelector, training, useAppDispatch} from '../../store'
import {alphabet} from '../../utils'
import {
    useAssets,
    mistakeAudioSrc,
    questionAudioSrc,
    successAudioSrc,
    useAudio,
    Audio,
} from '../../hooks'

export function Training() {
    const {asset} = useAssets()
    const dispatch = useAppDispatch()
    const activeLetter = useAppSelector(training.selectActiveLetter)
    const selectedLetter = useAppSelector(training.selectSelectedLetter)
    const activeStep = useAppSelector(training.selectActiveStep)
    const previousStep = useAppSelector(training.selectPreviousStep)

    const questionPlayList = useMemo(
        () => [
            asset(questionAudioSrc)!,
            asset(getLetterPath(activeLetter?.upper, `${activeLetter?.upper}.mp3`))!,
        ],
        [activeLetter?.upper, asset]
    )

    const questionCtrl = useAudio(questionPlayList)

    // TODO воспроизведение имени динозавра
    const firstQuestionPlayList = useMemo(
        () => [...(previousStep?.isPass ? [successAudioSrc] : []), ...questionPlayList],
        [activeLetter?.upper, asset]
    )

    const firstQuestionCtrl = useAudio(firstQuestionPlayList)

    const mistakePlayList = useMemo(
        () => [asset(mistakeAudioSrc)!, ...questionPlayList],
        [questionPlayList, asset]
    )

    const mistakeCtrl = useAudio(mistakePlayList)

    useEffect(() => {
        firstQuestionCtrl.play()
    }, [firstQuestionPlayList, firstQuestionCtrl.play])

    useEffect(() => {
        if (activeStep?.step?.mistakes) {
            mistakeCtrl.play()
        }
    }, [activeStep?.step?.mistakes])

    const onAcceptClick = useCallback(() => {
        dispatch(training.check())
    }, [dispatch])

    useEffect(() => {
        dispatch(training.init(shuffle(alphabet)))
        return () => {
            dispatch(training.reset())
        }
    }, [dispatch])

    return (
        <div className={s.wrap}>
            <Alphabet />
            <Actions
                onQuestionClick={questionCtrl.play}
                onAcceptClick={onAcceptClick}
                selectedLetter={selectedLetter}
            />
            <Audio {...mistakeCtrl.props} />
            <Audio {...questionCtrl.props} />
            <Audio {...firstQuestionCtrl.props} />
        </div>
    )
}
