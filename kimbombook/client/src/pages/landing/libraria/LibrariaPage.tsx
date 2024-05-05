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
import { Sidebar } from './layout/pageHeader/sidebar/Sidebar'
import { SidebarProvider } from '../../../contexts/SidebarContext'
import useBookFilterByCategory from '../../../hooks/books/useBookFilterByCategory'
// import useGetCathegoryById from '../../../hooks/categories/useGetCathegoryById'

const LibrariaPage: React.FC = () => {
  const books = useFetchBooks('title', 'asc', null)
  const authorNames = useGetAuthorsNames(books)
  const categoriesNames = useGetCategoriesNames(books)
  const categories = useFetchCategories('name', 'asc', null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { filteredBooks, setIdCategory } = useBookFilterByCategory('all')
  // const category = useGetCathegoryById(selectedCategory)

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory('all')
    }
  }, [categories])

  const handleCategoryChange = (categoryId: string): void => {
    setIdCategory(categoryId)
    setSelectedCategory(categoryId)
  }

  return (
    <SidebarProvider>
      <div className={styles.libraria}>
        <PageHeader />
        <div className={styles.libraria__container}>
          <Sidebar onSelect={handleCategoryChange}/>
          <div className={styles.libraria__categories_wrap}>
            <div className={styles.libraria__categories}>
              <CategoryPills
                categories={categories}
                selectedCategory = {selectedCategory}
                onSelect={handleCategoryChange}
              />
            </div>
            {/* <p>{category?.description}</p> */}
            <div className={styles.libraria__booksContainer}>
              {filteredBooks.map((book: Book) => (
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
    </SidebarProvider>
  )
}

export default LibrariaPage
