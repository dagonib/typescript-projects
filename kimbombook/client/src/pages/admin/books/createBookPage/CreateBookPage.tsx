import Form from '../components/form/Form'
// import { useState } from 'react'
// import { SelectCategories, type SelectCategoy } from '../components/selectCategories/SelectCategories'
import './createbookpage.css'
// import useFetchCategoriesFromStore from '../../../../hooks/useFetchCategoriesFromStore'

const CreateBookPage: React.FC = () => {
  // const listOFCategories = useFetchCategoriesFromStore()
  // const [value, setValue] = useState<SelectCategoy[]>([listOFCategories[0]])
  // console.log(listOFCategories)

  return (
    <div className='createbook'>
      <h3>Añadir Libro</h3>

      {/* <SelectCategories
        multiple
        options={listOFCategories}
        value={value}
        onChange={o => { setValue(o) }}
      /> */}
      <Form />
    </div>
  )
}

export default CreateBookPage
