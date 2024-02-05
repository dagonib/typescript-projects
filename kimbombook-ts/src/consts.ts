export const BOOK_FILTERS = {
  ALL: 'all',
  AVAILABLE: 'available',
  OUTOFSTOCK: 'outOfStock'
} as const

export const FILTERS_BUTTONS = {
  [BOOK_FILTERS.ALL]: {
    literal: 'Todos',
    href: `/?filter=${BOOK_FILTERS.ALL}`
  },
  [BOOK_FILTERS.AVAILABLE]: {
    literal: 'Disponible',
    href: `/?filter=${BOOK_FILTERS.AVAILABLE}`
  },
  [BOOK_FILTERS.OUTOFSTOCK]: {
    literal: 'Fuera de Stock',
    href: `/?filter=${BOOK_FILTERS.OUTOFSTOCK}`
  }
}
