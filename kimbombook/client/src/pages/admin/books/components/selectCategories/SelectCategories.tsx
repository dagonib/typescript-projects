import { useEffect, useState } from 'react'
import styles from './selectcategories.module.css'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SelectCategoryOption = {
  _id: string
  name: string
  description: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MultipleSelectCategoriesProps = {
  multiple: true
  value: SelectCategoryOption[]
  onChange: (value: SelectCategoryOption[]) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SingleSelectCategoriesProps = {
  multiple?: false
  value?: SelectCategoryOption
  onChange: (value: SelectCategoryOption | undefined) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SelectCategoriesProps = {
  options: SelectCategoryOption[]
} & (MultipleSelectCategoriesProps | SingleSelectCategoriesProps)

// Recibe:
// options: categorias
// value: categoria seleccionada
// onChange: funcion que se ejecuta cuando se selecciona una categoria
export function SelectCategories ({ multiple, value, onChange, options }: SelectCategoriesProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function clearOptions () {
    (multiple === true) ? onChange([]) : onChange(undefined)
  }

  function selectOption (option: SelectCategoryOption): void {
    if (multiple === true) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected (option: SelectCategoryOption): boolean {
    return multiple === true ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  return (
    <div
      onBlur={() => { setIsOpen(false) }}
      onClick={() => { setIsOpen(prev => !prev) }}
      tabIndex={0}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple === true
          ? value.map(v => (
            <button
              key={v._id}
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                selectOption(v)
              }}
              className={styles['option-badge']}
            >
              {v.name}
              <span className={styles['remove-btn']}>&times;</span>
            </button>
          ))
          : value?.name}</span>
      <button
        type='button'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          clearOptions()
        }}
        className={styles['clear-btn']}
      >&times;</button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        <li>Escoge una categoría</li>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => { setHighlightedIndex(index) }}
            key={option._id}
            className={`
              ${styles.option} ${isOptionSelected(option)
                ? styles.selected
                : ''}
              ${index === highlightedIndex ? styles.highlighted : ''}
              `}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
