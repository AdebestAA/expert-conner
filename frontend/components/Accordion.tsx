import React, { FC, useState } from 'react'

export const Accordion: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="mb-4">
      <button
        onClick={toggleAccordion}
        className="flex justify-between items-center w-full text-left font-semibold text-gray-900"
      >
        <div className="flex items-center">
          <span className="mr-2">{isOpen ? '−' : '+'}</span> {/* Icon on the left */}
          <span className="font-semibold">{title}</span>
        </div>
      </button>

      {isOpen && (
        <div className="mt-3 text-gray-500 text-sm">
          {children}
        </div>
      )}
    </div>
  )
}
