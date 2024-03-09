import { useEffect, useState } from 'react'
import './debouncedInput.css'

interface DebouncedInputProps {
  value: string
  onChange: (value: string) => void
  debounce?: number
  className?: string
  placeholder?: string
};

const DebouncedInput: React.FC<DebouncedInputProps> = ({ value: initValue, onChange, debounce = 500, ...props }) => {
  const [value, setValue] = useState(initValue)

  useEffect(() => {
    setValue(initValue)
  }, [initValue])

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => {
      clearTimeout(timeout)
    }
  }, [value])

  return (
    <div className='debounced-input'>
      <input
        {...props}
        value={value}
        onChange={(e) => { setValue(e.target.value) }}
      />
    </div>
  )
}

export default DebouncedInput
