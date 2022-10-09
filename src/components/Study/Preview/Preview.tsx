import {Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import s from './Preview.module.css'
import {LetterType} from '../../../utils'

export function Preview({alphabet}: {alphabet: LetterType[]}) {
    return (
        <div>
            <Swiper navigation modules={[Navigation]} className={s.preview}>
                {alphabet.map(l => (
                    <SwiperSlide className={s.slide}>{l.upper}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
