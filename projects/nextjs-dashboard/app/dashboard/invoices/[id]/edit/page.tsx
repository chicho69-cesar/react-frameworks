import { notFound } from 'next/navigation'

import Form from '@/app/ui/invoices/edit-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data'

/* Uno de los datos que reciben las paginas como props son los params para cuando
tenemos segmentos de rutas dinámicos usando []. */
export default async function Page({
  params
} : {
  params: { id: string }
}) {
  const { id } = params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ])

  /* Si no encuentra la factura, redirige a la pagina de not found. */
  if (!invoice) {
    notFound()
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />

      <Form
        invoice={invoice}
        customers={customers}
      />
    </main>
  )
}
