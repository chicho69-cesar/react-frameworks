import Image from 'next/image'
import { lusitana } from '@/app/ui/fonts'
import Search from '@/app/ui/search'
import { CustomersTable, FormattedCustomersTable } from '@/app/lib/definitions'

export default async function CustomersTable({
  customers,
}: {
  customers: FormattedCustomersTable[]
}) {
  return (
    <div className='w-full'>
      <h1 className={`${lusitana.className} mb-8 text-xl md:text-2xl`}>
        Customers
      </h1>
      
      <Search placeholder='Search customers...' />
      
      <div className='flow-root mt-6'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='p-2 overflow-hidden rounded-md bg-gray-50 md:pt-0'>
              <div className='md:hidden'>
                {customers?.map((customer) => (
                  <div
                    key={customer.id}
                    className='w-full p-4 mb-2 bg-white rounded-md'
                  >
                    <div className='flex items-center justify-between pb-4 border-b'>
                      <div>
                        <div className='flex items-center mb-2'>
                          <div className='flex items-center gap-3'>
                            <Image
                              src={customer.image_url}
                              className='rounded-full'
                              alt={`${customer.name}'s profile picture`}
                              width={28}
                              height={28}
                            />
                            
                            <p>{customer.name}</p>
                          </div>
                        </div>
                        
                        <p className='text-sm text-gray-500'>
                          {customer.email}
                        </p>
                      </div>
                    </div>
                    
                    <div className='flex items-center justify-between w-full py-5 border-b'>
                      <div className='flex flex-col w-1/2'>
                        <p className='text-xs'>Pending</p>
                        <p className='font-medium'>{customer.total_pending}</p>
                      </div>
                      
                      <div className='flex flex-col w-1/2'>
                        <p className='text-xs'>Paid</p>
                        <p className='font-medium'>{customer.total_paid}</p>
                      </div>
                    </div>
                    
                    <div className='pt-4 text-sm'>
                      <p>{customer.total_invoices} invoices</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <table className='hidden min-w-full text-gray-900 rounded-md md:table'>
                <thead className='text-sm font-normal text-left rounded-md bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                      Name
                    </th>
                    
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Email
                    </th>
                    
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Total Invoices
                    </th>
                    
                    <th scope='col' className='px-3 py-5 font-medium'>
                      Total Pending
                    </th>
                    
                    <th scope='col' className='px-4 py-5 font-medium'>
                      Total Paid
                    </th>
                  </tr>
                </thead>

                <tbody className='text-gray-900 divide-y divide-gray-200'>
                  {customers.map((customer) => (
                    <tr key={customer.id} className='group'>
                      <td className='py-5 pl-4 pr-3 text-sm text-black bg-white whitespace-nowrap group-first-of-type:rounded-md group-last-of-type:rounded-md sm:pl-6'>
                        <div className='flex items-center gap-3'>
                          <Image
                            src={customer.image_url}
                            className='rounded-full'
                            alt={`${customer.name}'s profile picture`}
                            width={28}
                            height={28}
                          />
                        
                          <p>{customer.name}</p>
                        </div>
                      </td>
                      
                      <td className='px-4 py-5 text-sm bg-white whitespace-nowrap'>
                        {customer.email}
                      </td>
                      
                      <td className='px-4 py-5 text-sm bg-white whitespace-nowrap'>
                        {customer.total_invoices}
                      </td>
                      
                      <td className='px-4 py-5 text-sm bg-white whitespace-nowrap'>
                        {customer.total_pending}
                      </td>
                      
                      <td className='px-4 py-5 text-sm bg-white whitespace-nowrap group-first-of-type:rounded-md group-last-of-type:rounded-md'>
                        {customer.total_paid}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
