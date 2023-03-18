import {useCallback, useEffect, useMemo} from 'react'
import s from './Training.module.css'
import {Alphabet} from './Alphabet/Alphabet'
import {Actions} from './Actions/Actions'
import {getLetterPath} from '../../utils'
import {useAppSelector, training, useAppDispatch} from '../../store'
import {alphabet} from '../../utils'
import {useAssets, mistakeAudioSrc, questionAudioSrc, useAudio, Audio} from '../../hooks'

export function Training() {
    const {asset} = useAssets()
    const activeLetter = useAppSelector(training.selectActiveLetter)
    const selectedLetter = useAppSelector(training.selectSelectedLetter)
    const activeStep = useAppSelector(training.selectActiveStep)

    const questionPlayList = useMemo(
        () => [
            asset(questionAudioSrc)!,
            asset(getLetterPath(activeLetter?.upper, `${activeLetter?.upper}.mp3`))!,
        ],
        [activeLetter?.upper, asset]
    )

    const questionCtrl = useAudio(questionPlayList)

    const mistakePlayList = useMemo(
        () => [asset(mistakeAudioSrc)!, ...questionPlayList],
        [questionPlayList, asset]
    )

    const mistakeCtrl = useAudio(mistakePlayList)

    const dispatch = useAppDispatch()

    useEffect(() => {
        questionCtrl.play()
    }, [questionPlayList, questionCtrl.play])

    useEffect(() => {
        const mistakes = activeStep?.step?.mistakes

        if (mistakes) {
            mistakeCtrl.play()
        }
    }, [activeStep?.step?.mistakes])

    const onAcceptClick = useCallback(() => {
        dispatch(training.check())
    }, [dispatch])

    useEffect(() => {
        dispatch(training.init(alphabet))
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
        </div>
    )
}
