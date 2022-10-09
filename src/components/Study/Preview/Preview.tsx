import {Pagination, Navigation} from 'swiper'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import s from './Preview.module.css'

export function Preview() {
    const pagination = {
        clickable: true,
        // renderBullet: function (index: number, className: string) {
        //     return '<span class="' + className + '">' + (index + 1) + '</span>'
        // },
    }

    return (
        <Swiper
            navigation
            pagination={pagination}
            modules={[Pagination, Navigation]}
            className={s.preview}
        >
            <SwiperSlide className={s.slide}>Slide 1</SwiperSlide>
            <SwiperSlide>Slide 2</SwiperSlide>
            <SwiperSlide>Slide 3</SwiperSlide>
            <SwiperSlide>Slide 4</SwiperSlide>
            <SwiperSlide>Slide 5</SwiperSlide>
            <SwiperSlide>Slide 6</SwiperSlide>
            <SwiperSlide>Slide 7</SwiperSlide>
            <SwiperSlide>Slide 8</SwiperSlide>
            <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
    )
}
