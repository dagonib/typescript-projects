import { Link } from 'react-router-dom'
import './pageHeader.css'
import { Button } from '../../components/button/Button'
import { TfiMenu } from 'react-icons/tfi'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

const PageHeader: React.FC = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState<boolean>(false)
  console.log('showFullWidthSearch', showFullWidthSearch)

  return (
    <div className={`pageHeader ${showFullWidthSearch ? 'pageHeader__small' : ''}` }>
      {!showFullWidthSearch && (
        <div className='pageHeader__logo'>
          <Button
            variant="menu"
          >
            <TfiMenu />
          </Button>
         <Link to="/">kimbombook</Link>
        </div>
      )}

      <form className={`pageHeader__searchForm ${showFullWidthSearch ? 'flex' : 'hidden'}`}>

        {showFullWidthSearch && (
          <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault()
            setShowFullWidthSearch(!showFullWidthSearch)
          }}
        >
            <BsArrowLeft />
        </Button>
        )}

        <div>
          <input type="search" placeholder='Search' />
          <Button variant="icon">
              <BiSearch />
          </Button>
        </div>
      </form>

      {!showFullWidthSearch && (
        <div className='pageHeader__smallSearchForm'>
          <Button onClick={() => { setShowFullWidthSearch(!showFullWidthSearch) } } variant="ghost">
              <BiSearch />
          </Button>
        </div>
      )}
    </div>
  )
}

export default PageHeader
