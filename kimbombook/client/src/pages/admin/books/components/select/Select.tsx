/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useRef, useState } from 'react'
import styles from './select.module.css'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type SelectOption = {
  label: string
  value: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MultiSelectProps = {
  multiple: true
  value: SelectOption[]
  onChange: (value: SelectOption[]) => void
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SingleSelectProps = {
  multiple?: false
  value: SelectOption | undefined
  onChange: (value: SelectOption | undefined) => void

}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SelectProps = {
  options: SelectOption[]
} & (MultiSelectProps | SingleSelectProps)

export function Select ({ multiple, value, onChange, options }: SelectProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  function clearOptions () {
    multiple ? onChange([]) : onChange(undefined)
  }

  function selectOption (option: SelectOption): void {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter(o => o !== option))
      } else {
        onChange([...value, option])
      }
    } else {
      if (option !== value) onChange(option)
    }
  }

  function isOptionSelected (option: SelectOption): boolean {
    return multiple ? value.includes(option) : option === value
  }

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const handler = (e: KeyboardEvent) => {
      if (e.target !== containerRef.current) return
      switch (e.code) {
        case 'Enter':
        case 'Space':
          setIsOpen(prev => !prev)
          if (isOpen) selectOption(options[highlightedIndex])
          break
        case 'ArrowUp':
        case 'ArrowDown': {
          if (!isOpen) {
            setIsOpen(true)
            break
          }
          // eslint-disable-next-line no-case-declarations
          const newValue = highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1)
          if (newValue >= 0 && newValue < options.length) {
            setHighlightedIndex(newValue)
          }
          break
        }
        case 'Escape':
          setIsOpen(false)
          break
      }
    }
    containerRef.current?.addEventListener('keydown', handler)

    return () => { containerRef.current?.removeEventListener('keydown', handler) }
  }, [isOpen, highlightedIndex, options])

  return (
    <div
      ref={containerRef}
      onBlur={() => { setIsOpen(false) }}
      onClick={() => { setIsOpen(prev => !prev) }}
      tabIndex={0}
      className={styles.container}
    >
      <span
        className={styles.value}>
           {multiple
             ? value?.map(v => (
              <button
                key={v.value}
                onClick={e => {
                  e.stopPropagation()
                  selectOption(v)
                }}
                className={styles['option-badge']}
              >
                {v.label}
                <span className={styles['remove-btn']}>&times;</span>
              </button>
             ))
             : value?.label
          }
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation()
          clearOptions()
        }}
        className={styles['clear-btn']}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen ? styles.show : ''}`}>
        {options.map((option, index) => (
          <li
            onClick={(e) => {
              e.stopPropagation()
              selectOption(option)
              setIsOpen(false)
            }}
            onMouseEnter={() => { setHighlightedIndex(index) }}
            key={option.value}
            className={`${styles.option} ${
              isOptionSelected(option) ? styles.selected : ''
            } ${
              index === highlightedIndex ? styles.highlighted : ''
            }`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
