import './recommendedAuthors.css'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'

import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'

import useGetRandomAuthors from '../../../../hooks/author/useGetRandomAuthors'
import MainButton from '../../UI/mainButton/MainButton'
import { BsArrowReturnRight } from 'react-icons/bs'

const RecommendedAuthors: React.FC = () => {
  const { randomAuthors } = useGetRandomAuthors()

  return (
    <section>
      <div className="container">
        <TitleTypeOne title='Autores Recomendados' titleTop={'Historias que dejan huella'}/>

        <Swiper
          style={{ marginTop: '56px' }}
          spaceBetween={50}
          slidesPerView={5}
          loop={true}
          modules={[Pagination]}
          pagination = {{
            el: '.swiper-pagination',
            clickable: true
          }}
          breakpoints={
            {
              0: {
                slidesPerView: 1,
                spaceBetween: 0
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 10
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30
              }
            }
          }
        >
          {
            randomAuthors.map(({
              name,
              imageLink
            }, _id) => {
              return (
                <SwiperSlide key={_id}>
                  <div className="recommendedAuthors__card">
                    <img
                      src={imageLink}
                      alt={name}
                      className="recommendedAuthors__card--image"
                    />
                    <h5 className="recommendedAuthors__card--name">{name}</h5>
                  </div>
                </SwiperSlide>
              )
            })
          }
          <div/>
          <div className='swiper-pagination'></div>
        </Swiper>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MainButton link='/libraria'>Ver Catálogo<BsArrowReturnRight /></MainButton>
        </div>

      </div>
    </section>
  )
}

export default RecommendedAuthors
