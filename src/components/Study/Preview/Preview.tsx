import {Dispatch, SetStateAction, useEffect, useState, useCallback} from 'react'
import {Navigation, Swiper as SwiperInstance, Keyboard} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import s from './Preview.module.css'
import {LetterType} from '../../../utils'
import {Slide} from './Slide/Slide'

export function Preview({
    alphabet,
    activeLetter,
    setActiveLetter,
}: {
    alphabet: LetterType[]
    activeLetter: LetterType | undefined
    setActiveLetter: Dispatch<SetStateAction<LetterType | undefined>>
}) {
    const activeIndex = alphabet.indexOf(activeLetter as LetterType)
    const [swiper, setSwiper] = useState<SwiperInstance>()

    useEffect(() => {
        if (
            activeIndex !== -1 &&
            activeIndex !== swiper?.activeIndex &&
            swiper?.destroyed !== true
        ) {
            swiper?.slideTo(activeIndex)
        }
    }, [activeIndex, swiper])

    const onSlideChange = useCallback(
        (swipe: SwiperInstance) => {
            setActiveLetter(alphabet[swipe.activeIndex])
        },
        [setActiveLetter, alphabet]
    )

    return (
        <div>
            <Swiper
                navigation
                keyboard
                modules={[Navigation, Keyboard]}
                className={s.preview}
                onSwiper={setSwiper}
                onSlideChangeTransitionEnd={onSlideChange}
            >
                {alphabet.map(letter => (
                    <SwiperSlide className={s.slide} key={letter.lower}>
                        {({isActive, isVisible}) => (
                            <Slide letter={letter} isActive={isActive} isVisible={isVisible} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
