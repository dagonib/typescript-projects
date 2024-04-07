import { Link } from 'react-router-dom'
import './recommendedBooks.css'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

// React Arrow Icons
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'
import useGetRandomBooks from '../../../../hooks/books/useGetRandomBooks'

const RecommendedBooks: React.FC = () => {
  const { randomBooks, authorNames } = useGetRandomBooks()

  return (
    <section>
        <div className="container recommended-books__container">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            modules={[Navigation, Pagination]}
            pagination = {{ el: '.swiper-Pagination', clickable: true }}
            navigation = {
              {
                prevEl: '.button-prev-slide',
                nextEl: '.button-next-slide'
              }
            }
          >
            {
              randomBooks.map(({
                title,
                author,
                description,
                imageLink,
                link
              }, _id) => {
                return (
                  <SwiperSlide key={_id}>
                    <div className='recommended-books__wrapper container'>
                      {/* Header Left */}
                      <div className="recommended-books__left">
                        <h1>{title}</h1>
                        <h5>{authorNames[author]}</h5>
                        <p dangerouslySetInnerHTML={ { __html: description } }></p>
                        <Link className='btn btn-border' to={link}>Comprar</Link>
                      </div>

                      {/* HeaderRight */}
                      <div className="recommended-books__right">
                        <img src={imageLink} alt={title} />
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }

            <div className="slider-button">
              <div className="button-prev-slide slidebutton">
                <GoArrowLeft />
              </div>
              <div className="button-next-slide slidebutton">
                <GoArrowRight />
              </div>
            </div>
          </Swiper>
        </div>
    </section>
  )
}

export default RecommendedBooks
