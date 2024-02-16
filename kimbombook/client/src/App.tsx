import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar/Navbar'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import { useAuthStore } from './store/auth.store'

// const mockBooks = [
//   {
//     id: '1',
//     author: 'Michael',
//     title: 'Tan poca vida',
//     description: 'Para descubrir eso y más, aquí está Tan poca vida, una historia que recorre más de tres décadas de amistad en la vida de cuatro hombres que crecen juntos en Manhattan. Cuatro hombres que tienen que sobrevivir al fracaso y al éxito y que, a lo largo de los años, aprenden a sobreponerse a las crisis económicas, sociales y emocionales. Cuatro hombres que comparten una idea muy peculiar de la intimidad, una manera de estar juntos hecha de pocas palabras y muchos gestos. Cuatro hombres cuya relación la autora utiliza para realizar una minuciosa indagación de los límites de la naturaleza humana.',
//     imageLink: 'https://m.media-amazon.com/images/I/816-B958itL._SY342_.jpg',
//     category: ['Novela Histórica'],
//     language: 'Castellano',
//     link: 'https://www.amazon.es/poca-vida-NARRATIVA-Hanya-Yanagihara/dp/8426403271?ref_=Oct_d_omwf_d_14177711031_0&pd_rd_w=KmDcW&content-id=amzn1.sym.e4354a4b-0830-4275-97ba-7906ebb9a899&pf_rd_p=e4354a4b-0830-4275-97ba-7906ebb9a899&pf_rd_r=948ZWC294VKMXTH6JFWV&pd_rd_wg=upnHN&pd_rd_r=61eef23b-289d-47bd-9ace-9691d3995815&pd_rd_i=8426403271',
//     available: true
//   },
//   {
//     id: '2',
//     author: 'Michael',
//     title: 'Tres enigmas para la Organización',
//     description: 'Barcelona, primavera de 2022. Los miembros de una organización gubernamental secreta se enfrentan a la peligrosísima investigación de tres casos que tal vez estén relacionados entre sí, o tal vez no: la aparición de un cuerpo sin vida en un hotel de Las Ramblas, la desaparición de un millonario británico en su yate y las singulares finanzas de Conservas Fernández. Creada en pleno franquismo y perdida en el limbo de la burocracia institucional del sistema democrático, la Organización sobrevive con apuros económicos y en los límites de la ley, con una reducida plantilla de personajes heterogéneos, extravagantes y mal avenidos. Entre el suspense y la carcajada, el lector deberá unirse a este disparatado grupo si quiere resolver los tres enigmas de este apasionante rompecabezas. Eduardo Mendoza entrega su mejor y más divertida aventura hasta la fecha. Y lo hace con nueve agentes secretos en una novela de detectives que actualiza los clásicos del género, y en la que el lector encontrará la inconfundible voz narrativa, el brillante sentido del humor, la sátira social y la comedia de enredo que caracterizan a uno de los mejores autores de la lengua española.',
//     imageLink: 'https://m.media-amazon.com/images/I/71B7-8nxIeL._SY425_.jpg',
//     category: ['Novela Histórica'],
//     language: 'Castellano',
//     link: 'https://www.amazon.es/Tres-enigmas-Organizaci%C3%B3n-Biblioteca-Breve/dp/8432242829/ref=sr_1_5?qid=1706902089&refinements=p_n_feature_browse-bin%3A15428535031&rnid=831437031&s=books&sr=1-5',
//     available: true
//   },
//   {
//     id: '3',
//     author: 'Michael',
//     title: 'Carta de una desconocida',
//     description: 'n el día de su cumpleaños, el famoso novelista R. vuelve de un retiro en las montañas. Al llegar a su casa, entre toda la correspondencia, encuentra una carta con el siguiente encabezamiento: "A vos, que nunca me conociste". De ahí en más, la confesión de una mujer, un amor imposible nacido desde la infancia, una fascinación en silencio y una devoción no correspondida se van develando de a poco en esa carta no exenta de sorpresas.',
//     imageLink: 'https://m.media-amazon.com/images/I/81xbWl5vHuL._SY425_.jpg',
//     category: ['Novela Histórica'],
//     language: 'Castellano',
//     link: 'https://www.amazon.es/Carta-una-desconocida-Stefan-Zweig-ebook/dp/B0BJW4844Y/ref=sr_1_7?qid=1706902089&refinements=p_n_feature_browse-bin%3A15428535031&rnid=831437031&s=books&sr=1-7',
//     available: true
//   },
//   {
//     id: '4',
//     author: 'Michael',
//     title: '1984 ',
//     description: 'En el año 1984 Londres es una ciudad lúgubre en la que la Policía del Pensamiento controla de forma asfixiante la vida de los ciudadanos. Winston Smith es un peón de este engranaje perverso y su cometido es reescribir la historia para adaptarla a lo que el Partido considera la versión oficial de los hechos. Hasta que decide replantearse la verdad del sistema que los gobierna y somete.',
//     imageLink: 'https://m.media-amazon.com/images/I/71sOSrd+JxL._SY425_.jpg',
//     category: ['Novela Histórica'],
//     language: 'Castellano',
//     link: 'https://www.amazon.es/1984-Contempor%C3%A1nea-CONTEMPORANEA-George-Orwell/dp/8499890946/ref=sr_1_13?qid=1706902089&refinements=p_n_feature_browse-bin%3A15428535031&rnid=831437031&s=books&sr=1-13',
//     available: false
//   }
// ]

const App = (): JSX.Element => {
  const isAuth = useAuthStore(state => state.isAuth)

  return (
    <Router>
      <div className='app'>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />

            <Route element={<ProtectedRoute isAllowed={isAuth} />}>
              <Route path='/profile' element={<ProfilePage />}></Route>
            </Route>
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
