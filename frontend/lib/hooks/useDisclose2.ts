import { useState } from 'react'

export const useDisclose2 = () => {
  const [isOpen2, setIsOpen2] = useState(false)
  const onOpen2 = () => setIsOpen2(true)
  const onClose2 = () => setIsOpen2(false)
  const onToggle2 = () => setIsOpen2(!isOpen2)

  return { isOpen2, onOpen2, onClose2, onToggle2 }
}
