import {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import s from './Preview.module.css'
import {LetterType} from '../../../utils'

export function Preview({alphabet}: {alphabet: LetterType[]}) {
    const pagination = {
        clickable: true,
        // renderBullet: function (index: number, className: string) {
        //     return '<span class="' + className + '">' + (index + 1) + '</span>'
        // },
    }

    return (
        <div>
            <Swiper
                navigation
                pagination={pagination}
                modules={[Pagination, Navigation]}
                className={s.preview}
            >
                {alphabet.map(l => (
                    <SwiperSlide className={s.slide}>{l.upper}</SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
