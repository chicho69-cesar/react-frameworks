'use client'
 
import { useEffect } from 'react'
 
/* La pagina de error en una ruta es la pagina que va a aparecer cuando suceda un error,
en la ruta especifica o en una ruta hija si no tienen un archivo que haga catch del 
error, esta función recibe el error y una función para hacer reset de la pagina. */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className='flex flex-col items-center justify-center h-full'>
      <h2 className='text-center'>
        Something went wrong!
      </h2>

      {/* Ejecutamos la función para hacer reset de la pagina. */}
      <button
        className='px-4 py-2 mt-4 text-sm text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-400'
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  )
}
