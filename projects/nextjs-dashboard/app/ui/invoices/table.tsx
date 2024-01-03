import Image from 'next/image'
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons'
import InvoiceStatus from '@/app/ui/invoices/status'
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils'
import { fetchFilteredInvoices } from '@/app/lib/data'

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string
  currentPage: number
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage)

  return (
    <div className='flow-root mt-6'>
      <div className='inline-block min-w-full align-middle'>
        <div className='p-2 rounded-lg bg-gray-50 md:pt-0'>
          <div className='md:hidden'>
            {invoices?.map((invoice) => (
              <div
                key={invoice.id}
                className='w-full p-4 mb-2 bg-white rounded-md'
              >
                <div className='flex items-center justify-between pb-4 border-b'>
                  <div>
                    <div className='flex items-center mb-2'>
                      <Image
                        src={invoice.image_url}
                        className='mr-2 rounded-full'
                        width={28}
                        height={28}
                        alt={`${invoice.name}'s profile picture`}
                      />
                      
                      <p>{invoice.name}</p>
                    </div>
                    
                    <p className='text-sm text-gray-500'>{invoice.email}</p>
                  </div>
                  
                  <InvoiceStatus status={invoice.status} />
                </div>
                
                <div className='flex items-center justify-between w-full pt-4'>
                  <div>
                    <p className='text-xl font-medium'>
                      {formatCurrency(invoice.amount)}
                    </p>
                    
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  
                  <div className='flex justify-end gap-2'>
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <table className='hidden min-w-full text-gray-900 md:table'>
            <thead className='text-sm font-normal text-left rounded-lg'>
              <tr>
                <th scope='col' className='px-4 py-5 font-medium sm:pl-6'>
                  Customer
                </th>
                
                <th scope='col' className='px-3 py-5 font-medium'>
                  Email
                </th>
                
                <th scope='col' className='px-3 py-5 font-medium'>
                  Amount
                </th>
                
                <th scope='col' className='px-3 py-5 font-medium'>
                  Date
                </th>
                
                <th scope='col' className='px-3 py-5 font-medium'>
                  Status
                </th>
                
                <th scope='col' className='relative py-3 pl-6 pr-3'>
                  <span className='sr-only'>Edit</span>
                </th>
              </tr>
            </thead>
            
            <tbody className='bg-white'>
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className='w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg'
                >
                  <td className='py-3 pl-6 pr-3 whitespace-nowrap'>
                    <div className='flex items-center gap-3'>
                      <Image
                        src={invoice.image_url}
                        className='rounded-full'
                        width={28}
                        height={28}
                      />
                      
                      <p>{invoice.name}</p>
                    </div>
                  </td>
                  
                  <td className='px-3 py-3 whitespace-nowrap'>
                    {invoice.email}
                  </td>
                  
                  <td className='px-3 py-3 whitespace-nowrap'>
                    {formatCurrency(invoice.amount)}
                  </td>
                  
                  <td className='px-3 py-3 whitespace-nowrap'>
                    {formatDateToLocal(invoice.date)}
                  </td>
                  
                  <td className='px-3 py-3 whitespace-nowrap'>
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  
                  <td className='py-3 pl-6 pr-3 whitespace-nowrap'>
                    <div className='flex justify-end gap-3'>
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
