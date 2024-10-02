import AdBox from '@/components/AdBox';
import apiService from '@/helpers/apiService';
import { apiRoutes } from '@/helpers/apiSlugs';
import { defaultAdminInfo } from '@/types/admin';
import React, { useEffect, useState } from 'react'

export default function Page() {
  const [adminInfo, setAdminInfo]: any = useState(defaultAdminInfo);

  useEffect(() => {
  }, [])

  const data = [
    {
      title: 'Total Wallets Created',
      count: adminInfo.total_wallets_created
    }, {
      title: 'Total Wallets SOL Balance',
      count: adminInfo.total_wallets_sol_balance
    }, {
      title: 'Total Wallets active in the past 24H',
      count: adminInfo.total_wallets_active_in_the_past_24h
    }, {
      title: 'Total platform volume in the past 24H (SOL)',
      count: adminInfo.total_platform_volume_in_the_past_24h
    }, {
      title: 'AVG user daily trades',
      count: adminInfo.avg_user_daily_trades
    }, {
      title: 'AVG user auto buy amount (SOL)',
      count: adminInfo.avg_user_auto_buy_amount
    }, {
      title: 'Total platform fees (SOL)',
      count: adminInfo.total_platform_fees
    }, {
      title: 'Platform fees in the past 24H (SOL)',
      count: adminInfo.platform_fees_in_the_past_24h
    }, {
      title: 'AVG user volume',
      count: adminInfo.avg_user_volume
    },
    
  ];

  return (
    <div className="w-full h-full">
      <div className='flex justify-center relative z-10'>
        <div className='mt-4 mb-2'>
          <h1 className="text-[35px] font-normal flex flex-col sm:flex-row text-white justify-center items-center">
            <span className="block">Admin</span>
            <span className="text-[#A04BF5] pl-2 xs:pl-2">Dashboard</span>
          </h1>



        </div>
      </div>

      {/* Responsive grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:mx-[120px] lg:mx-[240px] gap-x-4 md:gap-x-6 lg:gap-x-12'>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <AdBox title={item.title} count={item.count} />
            {/* Show button with specific design when title is "Download" */}
            {item.title === 'Download' && (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 flex justify-center mt-[40px]">
                <button
                  className="text-[20px] font-bold text-white px-10 rounded-[28px] py-4 text-center hidden md:block lg:hidden"
                  style={{
                    background: 'linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)',
                  }}
                >
                  Download
                </button>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className='flex justify-center gap-[16px] mt-[40px] pb-10'>
  <button
    className="text-[20px] font-bold text-white px-10 rounded-[28px] py-4 text-center block md:hidden lg:block"
    style={{
      background: 'linear-gradient(92.49deg, rgba(121, 23, 198, 0.79) 8.07%, #9F75D4 80.13%)',
    }}
  >
    Download
  </button>
</div>




    </div>
  )
}
