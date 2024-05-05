import './titleTypeTwo.css'
import victor from '../../../../assets/victor.png'

interface props {
  title: string
}

const TitleTypeTwo: React.FC<props> = ({ title }) => {
  return (
    <div className='titleTypeTwo'>
      <h1>{title}</h1>
      <img src={victor} alt="" className='image' />
    </div>
  )
}

export default TitleTypeTwo
