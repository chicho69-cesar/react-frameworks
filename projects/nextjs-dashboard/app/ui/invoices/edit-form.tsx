'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'

import { CustomerField, InvoiceForm } from '@/app/lib/definitions'
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/app/ui/button'
import { updateInvoice } from '@/app/lib/actions'

export default function EditInvoiceForm({
  invoice,
  customers,
}: {
  invoice: InvoiceForm
  customers: CustomerField[]
}) {
  /* Creamos el estado inicial para la server action. */
  const initialState = { message: null, errors: {} }
  /* Hacemos bind para pasarle los parámetros que necesita la acción. */
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id)
  /* Usamos el hook useFormState para manejar el estado de la acción. */
  const [state, dispatch] = useFormState(updateInvoiceWithId, initialState)

  return (
    /* Hacemos el llamado de la server action con el dispatch. */
    <form action={dispatch}>
      <div className='p-4 rounded-md bg-gray-50 md:p-6'>
        {/* Customer Name */}
        <div className='mb-4'>
          <label htmlFor='customer' className='block mb-2 text-sm font-medium'>
            Choose customer
          </label>
          
          <div className='relative'>
            <select
              id='customer'
              name='customerId'
              className='block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md cursor-pointer peer outline-2 placeholder:text-gray-500'
              defaultValue={invoice.customer_id}
              aria-describedby='customer-error'
            >
              <option value='' disabled>
                Select a customer
              </option>
              
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            
            <UserCircleIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500' />
          </div>

          <div id='customer-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.customerId && 
              state.errors.customerId.map((error: string) => (
                <p key={error} className='mt-2 text-sm text-red-500'>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Amount */}
        <div className='mb-4'>
          <label htmlFor='amount' className='block mb-2 text-sm font-medium'>
            Choose an amount
          </label>
          
          <div className='relative mt-2 rounded-md'>
            <div className='relative'>
              <input
                id='amount'
                name='amount'
                type='number'
                step='0.01'
                defaultValue={invoice.amount}
                placeholder='Enter USD amount'
                className='block w-full py-2 pl-10 text-sm border border-gray-200 rounded-md peer outline-2 placeholder:text-gray-500'
                aria-describedby='amount-error'
              />
              
              <CurrencyDollarIcon className='pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900' />
            </div>
          </div>

          <div id='amount-error' arial-live='polite' aria-atomic='true'>
            {state.errors?.amount &&
              state.errors.amount.map((error: string) => (
                <p key={error} className='mt-2 text-sm text-red-500'>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className='block mb-2 text-sm font-medium'>
            Set the invoice status
          </legend>
          
          <div className='rounded-md border border-gray-200 bg-white px-[14px] py-3'>
            <div className='flex gap-4'>
              <div className='flex items-center'>
                <input
                  id='pending'
                  name='status'
                  type='radio'
                  value='pending'
                  defaultChecked={invoice.status === 'pending'}
                  className='w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-2'
                  aria-describedby='status-error'
                />
                
                <label
                  htmlFor='pending'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600'
                >
                  Pending <ClockIcon className='w-4 h-4' />
                </label>
              </div>
              
              <div className='flex items-center'>
                <input
                  id='paid'
                  name='status'
                  type='radio'
                  value='paid'
                  defaultChecked={invoice.status === 'paid'}
                  className='w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 cursor-pointer focus:ring-2'
                  aria-describedby='status-error'
                />
                
                <label
                  htmlFor='paid'
                  className='ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white'
                >
                  Paid <CheckIcon className='w-4 h-4' />
                </label>
              </div>
            </div>
          </div>

          <div id='status-error' aria-live='polite' aria-atomic='true'>
            {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p key={error} className='mt-2 text-sm text-red-500'>
                  {error}
                </p>
              ))}
          </div>
        </fieldset>
      </div>

      {state.message && (
        <p className='mt-2 text-sm text-red-500'>
          {state.message}
        </p>
      )}
      
      <div className='flex justify-end gap-4 mt-6'>
        <Link
          href='/dashboard/invoices'
          className='flex items-center h-10 px-4 text-sm font-medium text-gray-600 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200'
        >
          Cancel
        </Link>
        
        <Button type='submit'>
          Edit Invoice
        </Button>
      </div>
    </form>
  )
}
