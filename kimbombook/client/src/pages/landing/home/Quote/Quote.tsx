import TitleTypeTwo from '../../UI/TitleTypeTwo/TitleTypeTwo'
import './quote.css'

const quoteData = [
  {
    id: 1,
    quote: '“The more that you read, the more things you will know. The more that you learn, the more places you’ll go.”',
    speaker: 'Dr. Seuss'
  }
]

const Quote: React.FC = () => {
  return (
    <section className='quote'>
      <div className="container quote-container">
        <TitleTypeTwo title={'Artículo del día'} className='quote-title' />
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
