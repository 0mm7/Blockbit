import { InfoIcon } from 'lucide-react'
import React from 'react'

interface Props {
  title?: string,
  content?: string
}

const InfoCard = (props: Props) => {
  return (
    <div className='bg-black w-[495px] px-8 py-[32px]
      rounded-[8px] border border-[#515151]'
    >
      <div className='flex items-center gap-2'>
        <InfoIcon size={24} color="white" />
        <span className='text-white text-[16px] font-bold'>{props.title}</span>
      </div>
      <p className='text-[14px] font-medium mt-5 text-[#989898]'>
        {props.content}
      </p>
    </div>
  )
}

export default InfoCard