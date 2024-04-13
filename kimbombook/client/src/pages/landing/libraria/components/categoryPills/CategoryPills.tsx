import { BiChevronLeft, BiChevronRight } from 'react-icons/bi'
import { type ListOfCategories } from '../../../../../types'
import { Button } from '../button/Button'
import styles from './categoryPills.module.css'
import { useEffect, useRef, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type CategoryPillsProps = {
  categories: ListOfCategories
  selectedCategory: string
  onSelect: (categoryId: string) => void
}

const TRANSLATE_AMOUNT = 200

export function CategoryPills ({ categories, selectedCategory, onSelect }: CategoryPillsProps): JSX.Element {
  const [translate, setTranslate] = useState<number>(0)
  const [isLeftVisible, setIsLeftVisible] = useState<boolean>(false)
  const [isRightVisible, setIsRightVisible] = useState<boolean>(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current === null) return

    const observer = new ResizeObserver((entries) => {
      const container = entries[0].target as HTMLDivElement
      if (container === null) return

      setIsLeftVisible(translate > 0)
      setIsRightVisible(translate + container.clientWidth < container.scrollWidth)
    })

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [categories, translate])

  return (
    <div
      className={styles.categoryPills}
      ref={containerRef}
    >
      <div
        className={styles.categoryPills__content}
        style={{ transform: `translateX(-${translate}px)` }}
      >
        <Button
            key={'all'}
            variant={selectedCategory === 'all' ? 'dark' : 'category'}
            onClick={() => { onSelect('all') }}
          >
            All
        </Button>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant={selectedCategory === category._id ? 'dark' : 'category'}
            onClick={() => { onSelect(category._id) }}
          >
            {category.name}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div
          className={styles.categories__sideButtons}
          style={{ left: '0' }}>
          <Button
            variant='ghost'
            style={{ height: '100%', aspectRatio: '1/1', width: 'auto', padding: '0.5rem' }}
            onClick={() => {
              setTranslate((translate: number) => {
                const newTranslate = translate - TRANSLATE_AMOUNT
                if (newTranslate <= 0) return 0
                return newTranslate
              })
            }}
          >
            <BiChevronLeft />
          </Button>
        </div>
      )}

      {isRightVisible && (
        <div
          className={styles.categories__sideButtons}
          style={{ right: '0', display: 'flex', justifyContent: 'end', backgroundImage: 'linear-gradient(to left, rgba(243, 242, 236, 1) 50%, rgba(243, 242, 236, 0))' }}>
          <Button
            variant='ghost'
            style={{ height: '100%', aspectRatio: '1/1', width: 'auto', padding: '0.5rem' }}
            onClick={() => {
              setTranslate((translate: number) => {
                if (containerRef.current === null) return translate
                const newTranslate = translate + TRANSLATE_AMOUNT
                const edge = containerRef.current.scrollWidth
                const width = containerRef.current.clientWidth
                if (newTranslate + width >= edge) return edge - width
                return newTranslate
              })
            }}
          >
           <BiChevronRight />
          </Button>
        </div>
      )}
    </div>
  )
}
// 45:07
