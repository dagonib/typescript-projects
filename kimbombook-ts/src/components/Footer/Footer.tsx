import './footer.css'

export const Footer: React.FC<Props> = ({ books }) => {
  return (
    <footer className='footer'>
      <span className='book-count'>
        <strong>{books.length}</strong> libros seleccionados
      </span>
      <Filters 
        
      />
    </footer>
  )
}
