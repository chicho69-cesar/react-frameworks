import { Suspense } from 'react'
import { Metadata } from 'next'

import Pagination from '@/app/ui/invoices/pagination'
import Search from '@/app/ui/search'
import Table from '@/app/ui/invoices/table'
import { CreateInvoice } from '@/app/ui/invoices/buttons'
import { lusitana } from '@/app/ui/fonts'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import { fetchInvoicesPages } from '@/app/lib/data'

/* Este titulo se renderizara en el template del title del main layout. */
export const metadata: Metadata = {
  title: 'Invoices',
}

/* Las paginas en Next reciben como parámetro muchos datos, entre ellos los searchParams
de las rutas. */
export default async function Page({
  searchParams
} : {
  searchParams?: {
    query?: string
    page?: string
  }
}) {
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1

  /* Como este es un react server podemos usar async y await para hacer fetch de datos 
  porque esto se renderiza solo en el servidor. */
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between w-full'>
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>

      <div className='flex items-center justify-between gap-2 mt-4 md:mt-8'>
        <Search placeholder='Search invoices...' />
        <CreateInvoice />
      </div>

      {/* Hacemos streaming de datos para el componente Table. */}
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>

      <div className='flex justify-center w-full mt-5'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
