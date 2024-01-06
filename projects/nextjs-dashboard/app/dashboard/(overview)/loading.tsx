import DashboardSkeleton from '@/app/ui/skeletons'

/* Cuando tenemos un componente llamado loading en una ruta, este componente servirá
como skeleton para la pagina, es decir, es el componente que se va a mostrar mientras la 
pagina esta cargando. */
export default function Loading() {
  return (
    <DashboardSkeleton />
  )
}
