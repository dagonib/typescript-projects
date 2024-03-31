import './featuresBooks.css'
import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

import { BsArrowReturnRight } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import useFetchBooks from '../../../../hooks/books/useFetchBooks'
import { type ListOfBooks } from '../../../../types'
import { useEffect, useState } from 'react'
import useGetAuthorsNames from '../../../../hooks/author/useGetAuthorsNames'

const FeaturesBooks: React.FC = () => {
  const books = useFetchBooks('title', 'desc', null)
  const [randomBooks, setRandomBooks] = useState<ListOfBooks>([])
  const authorNames = useGetAuthorsNames(randomBooks)

  useEffect(() => {
    if (books.length > 0) {
      const selectedBooks: ListOfBooks = []
      while (selectedBooks.length <= 11) {
        const randomIndex = Math.floor(Math.random() * books.length)
        if (!selectedBooks.includes(books[randomIndex])) {
          selectedBooks.push(books[randomIndex])
        }
      }
      setRandomBooks(selectedBooks)
    }
  }, [books])

  return (
    <section className='featurers'>
      <div className="container featurers-book-container">
        <TitleTypeOne className='clas' title='Libros Recomendados' titleTop={'Libros Recomendados'}/>
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
                         <div><h5><span>{authorNames[author]}</span></h5></div>
                         {/* <span><small>{category}</small></span> */}
                      </div>
                    </div>
                  </SwiperSlide>
                )
              })
            }
            <div className="feature-border container" />
            <div className="swiper-pagination"></div>
          </Swiper>
      </div>
      <Link to='/libraria' className='btn btn-border feature-btn'>
        Ver catálogo <BsArrowReturnRight />
      </Link>
    </section>
  )
}

export default FeaturesBooks
