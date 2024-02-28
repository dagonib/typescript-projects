import { Link } from 'react-router-dom'
import './header.css'

// Import Swiper React Components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination } from 'swiper/modules'

// React Arrow Icons
import { GoArrowRight, GoArrowLeft } from 'react-icons/go'

const headerBooks = [
  {
    _id: '65d5d665f2946eeea4a10310',
    title: '1984',
    author: 'George Orwell',
    description: 'La presente edición, avalada por The Orwell Estate, sigue fielmente el texto definitivo de las obras completas del autor, fijado por el profesor Peter Davison. Incluye un epílogo del novelista Thomas Pynchon, que aporta al análisis del libro su personal visión de los totalitarismos y la paranoia en el mundo moderno. Miguel Temprano García firma la soberbia traducción, que es la más reciente de la obra',
    imageLink: 'https://m.media-amazon.com/images/I/71sOSrd+JxL._SY425_.jpg',
    category: 'Novela Histórica',
    language: 'Castellano',
    link: 'https://www.amazon.es/1984-Contempor%C3%A1nea-CONTEMPORANEA-George-Orwell/dp/8499890946/ref=lp_14177711031_1_12?pf_rd_p=74b7ac6a-0a6c-46cc-85f8-2acbe1c0d42f&pf_rd_r=EGJBSHCTNTBC1JAZYD7C&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D',
    available: true
  },
  {
    _id: '65d5d73df2946eeea4a10315',
    title: 'Para no volver',
    author: 'Esther Tusquets',
    description: 'Para no volver es la quinta novela de Esther Tusquets, que hizo una irrupción personalísima y espléndida en la narrativa española con El mismo mar de todos los veranos. En ella reencontramos aquella burguesía ilustrada inmersa en el mediocre ambiente de la Barcelona de la época.',
    imageLink: 'https://m.media-amazon.com/images/I/71fSGwLnruL._SL1500_.jpg',
    category: 'Tremendismo y Existencialismo',
    language: 'Castellano',
    link: 'https://www.amazon.es/Para-no-volver-Narrativas-hisp%C3%A1nicas/dp/8433968750/ref=sr_1_2?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=37WV3BRFYFZJ1&dib=eyJ2IjoiMSJ9.iQk-9v0A1qtSvag3TmbyDLyrhGH62kUrhZokE_G2q3-svX28A5eU9TlhAdw7YusMWSu_Z95pOBElR-W_LvFkfhMG1nO3gtQpwejy99efEZnsGA6cn-16M2akEkbibk99BC-C735z1tcU3cJL-lPWQ0Mzm9OVNwZzWqEuAeWICICS22SKC3E-320Pkn0M5djkRHD87pDXzjfeqknkkRSbdkgNNMxKKB1waiWmKlEK5wg.n6UJh0UUuRDRNuDKSgUTmkJOvvmMTuqrI-Wt0uu0NsE&dib_tag=se&keywords=para+no+volver&qid=1708513024&s=books&sprefix=para+no+volver%2Cstripbooks%2C145&sr=1-2',
    available: false
  },
  {
    _id: '65d5d7aef2946eeea4a1031e',
    title: 'Vals Negro',
    author: 'Ana María Moix',
    description: 'Novela histórica, biografía novelada o crónica ficticia, Vals negro es el mejor exponente de la prosa depurada y poética de Ana María Moix. Con un estilo por momentos distante, por momentos íntimo y evocador, narra la historia de la princesa Elisabeth de Baviera, Sissi, sin concesiones a los tópicos que la leyenda ha consolidado y subrayando los claroscuros del mito.',
    imageLink: 'https://m.media-amazon.com/images/I/81xgrjRbejS._SY342_.jpg',
    category: 'Novela Años Sesenta',
    language: 'Castellano',
    link: 'https://www.amazon.es/Vals-Negro-Ana-Mar%C3%ADa-Moix/dp/8477653186/ref=sr_1_1?__mk_es_ES=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3MI3ASVVX9GYD&dib=eyJ2IjoiMSJ9.mx9IJTJl11NAgYLDS7Lv0mjUsWjDO1vZoRSMcfZqSedsIfwmpioFmv113CRVPkOEZni_pcRJxS9fJiOeCNVSIfVlwFSkTTwRssJ9zCD6QT8--hCkGwyfPuHLiTc0JLbQLV-T9MDR8uhugeDmFkdByWQ0V6ZxMX4v4HUFIoEdyDgQc9HQM64ziBNJbYXT6Rwt071jPWy4oAyZ6fNBYZuVeq9X-4i3uQcP5UMsaDaI98s.JZqkt9yhZxOickWYpyurNnf_wB4nCLUmMtlf1IYfaTc&dib_tag=se&keywords=vals+negro&qid=1708513128&s=books&sprefix=vals+negro%2Cstripbooks%2C129&sr=1-1',
    available: true
  }
]

const Header: React.FC = () => {
  return (
    <header>
        <div className="container header-container">
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
              headerBooks.map(({
                title,
                author,
                description,
                imageLink,
                link
              }, _id) => {
                return (
                  <SwiperSlide key={_id}>
                    <div className='header-wrapper container'>
                      {/* Header Left */}
                      <div className="header-left">
                        <h1>{title}</h1>
                        <h5>{author}</h5>
                        <p dangerouslySetInnerHTML={ { __html: description } }></p>
                        <Link className='btn btn-border' to={link}>Learn</Link>
                      </div>

                      {/* HeaderRight */}
                      <div className="header-right">
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
    </header>
  )
}

export default Header
