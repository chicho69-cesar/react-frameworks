import { Suspense } from 'react'

import CardWrapper from '@/app/ui/dashboard/cards'
import LatestInvoices from '@/app/ui/dashboard/latest-invoices'
import RevenueChart from '@/app/ui/dashboard/revenue-chart'
import { LatestInvoicesSkeleton, RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons'
import { lusitana } from '@/app/ui/fonts'
 
/* Cuando tenemos rutas dentro de una carpeta que tiene el nombre entre paréntesis,
quiere decir que son rutas agrupadas, por lo que el nombre de la carpeta no formara
parte del enlace de la ruta, pero si podemos tener dentro por ejemplo un layout que solo
afecta a ese grupo de rutas, o un loading para streaming de paginas que también solo
afecta a ese grupo de rutas, etc. */
export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {/* Cuando usamos el componente Suspense de react en Next, este nos permite
        hacer streaming de datos, es decir, nos permite mostrar un callback mientras el
        componente se termina de renderizar, pero lo mas increíble de esto es que, si tenemos
        varios componentes con streaming de datos en una misma ruta, los componentes se
        irán mostrando mientras va cargando cada uno de forma totalmente en paralelo, 
        mientras tanto se muestra el fallback de cada uno. */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>

      <div className='grid grid-cols-1 gap-6 mt-6 md:grid-cols-4 lg:grid-cols-8'>
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        
        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}
