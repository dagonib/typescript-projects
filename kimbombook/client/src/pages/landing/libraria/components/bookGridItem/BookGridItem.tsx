import styles from './bookGridItem.module.css'

interface BookGridItemProps {
  title: string
  author: string
  imageLink: string
  category: string
  link: string
}

export function BookGridItem ({
  title,
  author,
  imageLink,
  category,
  link
}: BookGridItemProps): JSX.Element {
  return (
    <div className={styles.box}>
      <div className={styles.image}>
        <img src={imageLink} alt="Imagen de la portada" />
      </div>
      <div className={styles.info}>
        <h4>{title}</h4>
        <h5>{author}</h5>
        <p>{category}</p>
      </div>
      <a className={styles.link} href={link}>Comprar</a>
    </div>
  )
}
