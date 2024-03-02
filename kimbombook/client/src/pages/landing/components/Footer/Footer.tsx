import './footer.css'

import { ImFacebook, ImBehance } from 'react-icons/im'
import { FiInstagram } from 'react-icons/fi'
import { RiTwitterXLine } from 'react-icons/ri'
import { GrLinkedinOption } from 'react-icons/gr'

// Footers Data .......................
const FootersLinksData = {

  socials: [
    { icon: ImFacebook, link: 'https://www.facebook.com' },
    { icon: FiInstagram, link: 'https://www.twitter.com' },
    { icon: GrLinkedinOption, link: 'https://www.instagram.com' },
    { icon: RiTwitterXLine, link: 'https://www.twitter.com' },
    { icon: ImBehance, link: 'https://www.twitter.com' }
  ]
}

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="container footer__container">
        <p>@dagonib</p>
        <div className="footer__container-socials">
          {
            FootersLinksData.socials.map((item, index) => {
              return (
                <a href={item.link} key={index}>
                  <item.icon />
                </a>
              )
            })
          }
        </div>
      </div>
    </footer>
  )
}

export default Footer
