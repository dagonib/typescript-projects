import { BiChevronDown, BiChevronUp } from 'react-icons/bi'
import styles from './sidebar.module.css'
import { Children, type ReactNode, useState } from 'react'
import { useSidebarContext } from '../../../../../../contexts/SidebarContext'
import { PageHeaderFirstSection } from '../PageHeader'
import useFetchCategories from '../../../../../../hooks/categories/useFetchCategories'
import useFetchAuthors from '../../../../../../hooks/author/useFetchAuthors'

export function Sidebar (): JSX.Element {
  const { isOpen, close } = useSidebarContext()
  const categories = useFetchCategories('name', 'asc', null)
  const authors = useFetchAuthors('name', 'asc', null)

  return (
    <>
      <aside
        className={isOpen ? styles.sidebarOpen : styles.sidebar}>
        <div
          className={styles.sidebar__header}
        >
          <PageHeaderFirstSection />
        </div>
        <SidebarSection
          title='Categorías'
          visibleItemCount={4}
        >
          {categories.map(category => (
            <SidebarItem
              key={category._id}
              title={category.name}
              url='/'
            />
          ))}
        </SidebarSection>
        <hr/>
        <SidebarSection
          title='Autores'
          visibleItemCount={4}
        >
          {authors.map(author => (
            <SidebarItem
              key={author._id}
              title={author.name}
              url='/'
            />
          ))}
        </SidebarSection>
      </aside>
      {isOpen && (
        <div
          onClick={close}
          className={styles.sidebar__open}
          style={{ display: 'block' }}
        ></div>
      )}
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
// type SmallSidebarItemProps = {
//   Icon: ElementType
//   title: string
//   url: string
// }

// function SmallSidebarItem ({ Icon, title, url }: SmallSidebarItemProps): JSX.Element {
//   return (
//     <a href={url} className={styles.smallSidebarItem}>
//       <Icon className='mr-2' />
//       <div>{title}</div>
//     </a>
//   )
// }

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SidebarSectionProps = {
  children: ReactNode
  title?: string | null
  visibleItemCount?: number
}

function SidebarSection ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY
}: SidebarSectionProps): JSX.Element {
  const [isExpanded, setIsExpanded] = useState(false)
  const childrenArray = Children.toArray(children).flat()
  const showExpandButton = childrenArray.length > visibleItemCount
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, visibleItemCount)
  const ButtonIcon = isExpanded ? BiChevronUp : BiChevronDown

  return (
    <div>
      {(title != null) &&
        <div
          className={styles.sidebarSectionTitle}
        >
          {title}
        </div>}
      {visibleChildren}
      {showExpandButton && (
        <div>
          <a
            className={styles.expandButton}
            onClick={() => { setIsExpanded(e => !e) }}
          >
            <ButtonIcon className='mr-2' />
            <div className={styles.title}>
              {isExpanded ? 'Show less' : 'Show more'}
            </div>
          </a>
        </div>
      )}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type SidebarItemProps = {
  isActive?: boolean
  title: string
  url: string
}

function SidebarItem ({ isActive = false, title, url }: SidebarItemProps): JSX.Element {
  return (
    <a
      href={url}
      {...(isActive
        ? { className: styles.activeSidebarItem }
        : { className: styles.sidebarItem })
      }
    >
      <div className={styles.title}>{title}</div>
    </a>
  )
}
