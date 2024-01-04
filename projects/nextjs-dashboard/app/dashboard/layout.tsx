import SideNav from '@/app/ui/dashboard/sidenav'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex flex-col h-screen md:flex-row md:overflow-hidden'>
      <div className='flex-none w-full md:w-64'>
        <SideNav />
      </div>
      
      <div className='flex-grow p-4 md:overflow-y-auto md:p-8'>
        {children}
      </div>
    </div>
  )
}
