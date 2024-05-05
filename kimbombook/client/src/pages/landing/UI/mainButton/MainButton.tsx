import { Link } from 'react-router-dom'
import styles from './mainButton.module.css'

interface props {
  link: string
  children: React.ReactNode
}

const MainButton: React.FC<props> = ({ link, children }) => {
  return (
    <Link
      to={link}
      className={styles.btn}
    >
      {children}
    </Link>
  )
}

export default MainButton
