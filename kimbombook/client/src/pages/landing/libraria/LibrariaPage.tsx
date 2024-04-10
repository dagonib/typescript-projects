import { useEffect, useState } from 'react'
import useFetchCategories from '../../../hooks/categories/useFetchCategories'
import { CategoryPills } from './components/categoryPills/CategoryPills'
import PageHeader from './layout/pageHeader/PageHeader'
import styles from './librariapage.module.css'
import { type Book } from '../../../types'
import useFetchBooks from '../../../hooks/books/useFetchBooks'
import { BookGridItem } from './components/bookGridItem/BookGridItem'
import useGetAuthorsNames from '../../../hooks/author/useGetAuthorsNames'
import useGetCategoriesNames from '../../../hooks/categories/useGetCategoriesNames'

const LibrariaPage: React.FC = () => {
  const books = useFetchBooks('title', 'asc', null)
  console.log(books)
  const authorNames = useGetAuthorsNames(books)
  console.log(authorNames)
  const categoriesNames = useGetCategoriesNames(books)
  console.log(categoriesNames)
  const categories = useFetchCategories('name', 'asc', null)
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?._id)

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]._id)
    }
  }, [categories])

  return (
    <div className={styles.libraria}>
      <PageHeader />
      <div className={styles.libraria__container}>
        <div>SideBar</div>
        <div className={styles.libraria__categories_wrap}>
          <div className={styles.libraria__categories}>
            <CategoryPills
              categories={categories}
              selectedCategory = {selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className={styles.libraria__booksContainer}>
            {books.map((book: Book) => (
              <BookGridItem
                key={book._id}
                title={book.title}
                author={authorNames[book.author]}
                imageLink={book.imageLink}
                category={categoriesNames[book.categories[0]]}
                link={book.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LibrariaPage
