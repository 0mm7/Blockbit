import { getReadableSmallNumber } from '@/utils/number';
import React from 'react';

interface Props {
  title?: string;
  count?: string;
}

const AdBox = (props: Props) => {
  return (
    <div className="relative m-3 px-[20px] rounded-[24px] overflow-hidden w-full">
      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#CFF3FF1A] to-[#3535351A]"
        style={{ backgroundBlendMode: 'lighten' }}
      />

      {/* Content */}
      <div className="relative z-10 rounded-[24px] py-[20px] xs:py-[20px] sm:py-[20px] h-full">
  <div className="text-white text-[16px] md:text-[16px] font-semibold text-center px-[10px] md:mt-[20px] flex justify-center max-w-[230px] m-auto h-[30px] items-center">
    {props.title}
  </div>
  <div className="text-[24px] md:text-[24px] text-white font-bold flex justify-center pt-[10px] pb-[10px]">
    {getReadableSmallNumber(parseFloat(props.count!))}
  </div>
</div>




    </div>
  );
}

export default AdBox;
