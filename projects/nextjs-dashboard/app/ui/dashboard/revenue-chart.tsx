import { generateYAxis } from '@/app/lib/utils'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { lusitana } from '@/app/ui/fonts'
import { fetchRevenue } from '@/app/lib/data'

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

export default async function RevenueChart() {
  const revenue = await fetchRevenue()

  const chartHeight = 350
  const { yAxisLabels, topLabel } = generateYAxis(revenue)

  if (!revenue || revenue.length === 0) {
    return <p className='mt-4 text-gray-400'>No data available.</p>
  }

  return (
    <div className='w-full md:col-span-4'>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Recent Revenue
      </h2>
      
      {/* NOTE: comment in this code when you get to this point in the course */}

      <div className='p-4 rounded-xl bg-gray-50'>
        <div className='flex items-end justify-start'>
          <div
            className='flex-col justify-between hidden text-sm text-gray-400 mb-11 sm:flex'
            style={{ height: `${chartHeight}px` }}
          >
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>
          
          <div className='grid items-end grid-cols-12 gap-2 p-4 mt-0 bg-white rounded-md sm:grid-cols-12 md:gap-2'>
            {revenue.map((month) => (
              <div key={month.month} className='flex flex-col items-center gap-2'>
                <div
                  className='w-full bg-blue-300 rounded-md'
                  style={{
                    height: `${(chartHeight / topLabel) * month.revenue}px`,
                  }}
                ></div>
                
                <p className='text-sm text-gray-400 -rotate-90 sm:rotate-0'>
                  {month.month}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className='flex items-center pt-6 pb-2'>
          <CalendarIcon className='w-5 h-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500'>Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
