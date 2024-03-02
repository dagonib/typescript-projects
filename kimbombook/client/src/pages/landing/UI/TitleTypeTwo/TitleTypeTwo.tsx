import './titleTypeTwo.css'
import victor from '../../../../assets/victor.png'

interface props {
  title: string
  className: string
}

const TitleTypeTwo: React.FC<props> = ({ title, className }) => {
  return (
    <div className={`titleTypeTwo ${className}`}>
      <h2>{title}</h2>
      <img src={victor} alt="" className='victor' />
    </div>
  )
}

export default TitleTypeTwo
