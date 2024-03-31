import Header from './Header/Header'
import FeaturesBooks from './FeaturesBooks/FeaturesBooks'
import RecommendedCollections from './RecommendedCollections/RecommendedCollections'
import Quote from './Quote/Quote'
import LatestArticles from '../components/LatestArticles/LatestArticles'

const HomePage: React.FC = () => {
  return (
      <>
        <Header />
        <FeaturesBooks />
        <RecommendedCollections />
        <Quote />
        <LatestArticles />
      </>
  )
}

export default HomePage
