// import Header from './Header/Header'
import RecommendedBooks from './recommendedBooks/RecommendedBooks'
import FeaturesBooks from './FeaturesBooks/FeaturesBooks'
import RecommendedCollections from './RecommendedCollections/RecommendedCollections'
import Quote from './Quote/Quote'
import LatestArticles from '../components/LatestArticles/LatestArticles'
import RecommendedAuthors from './recommendedAuthors/RecommendedAuthors'

const HomePage: React.FC = () => {
  return (
      <>
        <RecommendedBooks />
        <FeaturesBooks />
        <RecommendedCollections />
        <Quote />
        <RecommendedAuthors />
        <LatestArticles />
      </>
  )
}

export default HomePage
