import { useState } from 'react'
import styles from './selectcategories.module.css'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SelectCategoryOption = {
  _id: string
  name: string
  description: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SelectCategoriesProps = {
  options: SelectCategoryOption[]
  value: SelectCategoryOption | undefined
  onChange: (value: SelectCategoryOption | undefined) => void
}

// Recibe:
// options: categorias
// value: categoria seleccionada
// onChange: funcion que se ejecuta cuando se selecciona una categoria
export function SelectCategories ({ value, onChange, options }: SelectCategoriesProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)

  function clearOptions (): void {
    onChange(undefined)
  }

  return (
    <div
      onBlur={() => { setIsOpen(false) }}
      onClick={() => { setIsOpen(prev => !prev) }}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>{value?.name}</span>
      <button
        onClick={(e) => {
          clearOptions()
        }}
        className={styles['clear-btn']}
      >&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.catet}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map(option => (
          <li key={option._id} className={styles.option}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
