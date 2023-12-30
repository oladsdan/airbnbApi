import React from 'react'

const MenuItem = ({onClickMenu, label}) => {
  return (
    <div className='px-4 py-3 hover:bg-neutral-100 transition font-semibold' onClick={onClickMenu}>
        {label}
    </div>
  )
}

export default MenuItem