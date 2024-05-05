import TitleTypeTwo from '../../UI/TitleTypeTwo/TitleTypeTwo'
import './quote.css'

const quoteData = [
  {
    id: 1,
    quote: '“La literatura es el mejor instrumento para comprender el alma humana y explorar los rincones más profundos de la experiencia humana.”',
    speaker: 'Gabriel García Márquez'
  }
]

const Quote: React.FC = () => {
  return (
    <section className='section__alt'>
      <div className="container">
        <TitleTypeTwo title={'Palabras de segunda mano'} />
          {
            quoteData.map(({ quote, speaker }, index) => {
              return (
                <article key={index}>
                  <p>{quote}</p>
                  <h5>{speaker}</h5>
                </article>
              )
            })
          }
      </div>
    </section>
  )
}

export default Quote
