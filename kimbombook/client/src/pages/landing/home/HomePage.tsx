import Header from './Header/Header'
import FeaturesBooks from './FeaturesBooks/FeaturesBooks'
import RecommendedCollections from './RecommendedCollections/RecommendedCollections'
import Quote from './Quote/Quote'
import { FilterProvider } from '../../../context/filterContext/FilterProvider'
import LatestArticles from '../components/LatestArticles/LatestArticles'

const HomePage: React.FC = () => {
  return (
    <FilterProvider>
      <>
        <Header />
        <FeaturesBooks />
        <RecommendedCollections />
        <Quote />
        <LatestArticles />
      </>
    </FilterProvider>
  )
}

export default HomePage
