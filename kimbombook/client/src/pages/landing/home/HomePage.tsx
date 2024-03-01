import Header from './Header/Header'
import FeaturesBooks from './FeaturesBooks/FeaturesBooks'
import RecommendedCollections from './RecommendedCollections/RecommendedCollections'

const HomePage: React.FC = () => {
  return (
    <>
      <Header />
      <FeaturesBooks />
      <RecommendedCollections />
    </>
  )
}

export default HomePage
