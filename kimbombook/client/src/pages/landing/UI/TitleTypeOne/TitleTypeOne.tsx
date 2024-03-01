import './titleTypeOne.css'
import victor from '../../../../assets/victor.png'

interface props {
  className: string
  titleTop: string
  title: string
}

const TitleTypeOne: React.FC<props> = ({ className, title, titleTop }) => {
  return (
    <div className={`titleTypeOne ${className}`}>
      <small>{titleTop}</small>
      <div className="heading-H">
        <div className="line"></div>
        <h2>{title}</h2>
        <div className="line"></div>
      </div>
      <img src={victor} alt="" className='victor' />
    </div>
  )
}

export default TitleTypeOne
