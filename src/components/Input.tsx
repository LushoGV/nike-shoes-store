import React from 'react'

type Props = {
    placeholder: string
}

const Input = (props: Props) => {
  return (
    <input placeholder={props.placeholder} className='bg-transparent border-[1px] w-full py-3 rounded-md pl-3 mb-1 outline-0 focus:border-gray-300' />
  )
}

export default Input