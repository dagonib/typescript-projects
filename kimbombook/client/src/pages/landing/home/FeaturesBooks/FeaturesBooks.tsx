import './featuresBooks.css'
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import { BsArrowReturnRight } from 'react-icons/bs'
// import { Link } from 'react-router-dom'
import useGetRandomBooks from '../../../../hooks/books/useGetRandomBooks'
import MainButton from '../../UI/mainButton/MainButton'

const FeaturesBooks: React.FC = () => {
  const { randomBooks, authorNames } = useGetRandomBooks()

  return (
    <section>
      <div className="container">
        <TitleTypeOne title='Libros Recomendados' titleTop={'Historias que dejan huella'}/>
        <Swiper
            spaceBetween={50}
            slidesPerView={4}
            loop={true}
            modules={[Pagination]}
            pagination = {{
              el: '.swiper-pagination',
              clickable: true
            }}
            breakpoints = {
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
              randomBooks.map(({
                title,
                author,
                imageLink
              }, _id) => {
                return (
                  <SwiperSlide key={_id}>
                    <div className="featurebook-box">
                      <div className='featurebook-image'>
                        <img src={imageLink} alt={title} />
                      </div>
                      <div className='featurebook-info'>
                         <h4>{title}</h4>
                         <h5>{authorNames[author]}</h5>
                      </div>
                         {/* <span><small>{category}</small></span> */}
                    </div>
                  </SwiperSlide>
                )
              })
            }
            <div/>
            <div className="swiper-pagination"></div>
        </Swiper>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <MainButton link='/libraria'>Ver Catálogo<BsArrowReturnRight /></MainButton>
        </div>
      </div>
    </section>
  )
}

export default FeaturesBooks
