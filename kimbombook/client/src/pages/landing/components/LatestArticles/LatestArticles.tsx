import TitleTypeOne from '../../UI/TitleTypeOne/TitleTypeOne'
import './latestArticles.css'

import ArticleImage1 from '../../../../assets/articles/ArticleImage1.png'
import ArticleImage2 from '../../../../assets/articles/ArticleImage2.png'
import ArticleImage3 from '../../../../assets/articles/ArticleImage3.png'
import { Link } from 'react-router-dom'
import { BsArrowRight } from 'react-icons/bs'

const lettestArticleData = [
  {
    id: 1,
    title: 'Reading books always makes the moments happy',
    image: ArticleImage1,
    titLink: '#',
    date: '2 aug, 2021',
    inspiration: 'Inspiration'
  },
  {
    id: 2,
    image: ArticleImage2,
    title: 'Reading books always makes the moments happy',
    titleLink: '*',
    date: '2 aug, 2021',
    inspiration: 'Inspiration'
  },
  {
    id: 3,
    image: ArticleImage3,
    title: 'Reading books always makes the moments happy',
    titleLink: '*',
    date: '2 aug, 2021',
    inspiration: 'Inspiration'
  }
]

const LatestArticles: React.FC = () => {
  return (
    <section>
      <div className="container">
        <TitleTypeOne title={'Últimos Artículos'} titleTop={'Lee nuestros artículos'} className='' />

        <div className="latest-articles__content">
          {
            lettestArticleData.map(({ id, image, title, date }) => {
              return (
                <article key={id} className='latest-articles__article'>
                  <div>
                    <img src={image} alt="" className='latest-articles__article--image' />
                  </div>
                  <div className="latest-articles__article--info">
                    <h5>{date}</h5>
                    <Link to=''>
                      <h3>{title}</h3>
                    </Link>
                  </div>
                </article>
              )
            })
          }
        </div>

        <Link to='' className='btn btn-border'>Artículos <span><BsArrowRight /></span></Link>
      </div>
    </section>
  )
}

export default LatestArticles
