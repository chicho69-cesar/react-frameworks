import styles from '@/app/ui/home.module.css'

import { ArrowRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// import AcmeLogo from '@/app/ui/acme-logo'

export default function Page() {
  return (
    <main className='flex flex-col min-h-screen p-6'>
      <div className='flex items-end h-20 p-4 bg-blue-500 rounded-lg shrink-0 md:h-52'>
        {/* <AcmeLogo /> */}
      </div>
      
      <div className='flex flex-col gap-4 mt-4 grow md:flex-row'>
        <div className='flex flex-col justify-center gap-6 px-6 py-10 rounded-lg bg-gray-50 md:w-2/5 md:px-20'>
          {/* <div
            className='h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent'
          /> */}

          <div className={styles.shape} />
          
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            
            <a href='https://nextjs.org/learn/' className='text-blue-500'>
              Next.js Learn Course
            </a>
            
            , brought to you by Vercel.
          </p>

          <Link
            href='/login'
            className='flex items-center self-start gap-5 px-6 py-3 text-sm font-medium text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-400 md:text-base'
          >
            <span>Log in</span> <ArrowRightIcon className='w-5 md:w-6' />
          </Link>
        </div>
        
        <div className='flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12'>
          {/* Add Hero Images Here */}
        </div>
      </div>
    </main>
  )
}
