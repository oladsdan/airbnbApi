import React from 'react'


const Buttons = ({label, outline, small, disabled, Icon, onClick}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full
    ${outline? 'bg-white border border-black text-black' : 'bg-rose-500 border-rose-500 text-white'}
    ${small? 'py-1 text-sm font-light border-[1px]': 'py-3 text-md font-semibold borderr-2'}`}>
      {Icon && (
        <Icon size={24} className="absolute left-4 top-3" />
      )}{label}</button>
  )
}

export default Buttons