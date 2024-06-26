import { Link } from 'react-router-dom'
import './pageHeader.css'
import { Button } from '../../components/button/Button'
import { TfiMenu } from 'react-icons/tfi'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import logo from '../../../../../assets/logo.png'
import { useSidebarContext } from '../../../../../contexts/SidebarContext'

const PageHeader: React.FC = () => {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState<boolean>(false)

  return (
    <div className={`pageHeader ${showFullWidthSearch ? 'pageHeader__small' : ''}` }>
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
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

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type PageHeaderFirstSectionProps = {
  hidden?: boolean
}

export function PageHeaderFirstSection ({ hidden = false }: PageHeaderFirstSectionProps): JSX.Element {
  const { toggle } = useSidebarContext()

  return (
    <>
      {!hidden && (
        <div className='pageHeader__logo'>
          <Button
            onClick={toggle}
            variant="menu"
          >
            <TfiMenu />
          </Button>
          <Link to="/" className='nav-logo'>
            <img src={logo} alt='logo' />
            <p>Kimbombook</p>
          </Link>
        </div>
      )}
    </>
  )
}

export default PageHeader
