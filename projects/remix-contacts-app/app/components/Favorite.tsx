import { useFetcher } from '@remix-run/react'
import type { FunctionComponent } from 'react'

import type { ContactRecord } from '~/data/data'

interface Props {
  contact: Pick<ContactRecord, 'favorite'>
}

export const Favorite: FunctionComponent<Props> = ({ contact }) => {
  /* El hook useFetcher permite obtener los datos del formulario al hacer submit
  incluso antes de que esta llegue a la acción que después va a generar una revalidación
  de la información. */
  const fetcher = useFetcher()
  
  /* Determinamos si favorite es true si la data del formData que fue mandado en la
  petición por el formulario tiene un campo llamado favorite y este tiene el valor en true.
  Esto lo hacemos para hacer cambios optimistas en la UI antes de que la data llegue al
  servidor con la acción y que esta revalide la información. */
  const favorite = fetcher.formData
    ? fetcher.formData.get('favorite') === 'true'
    : contact.favorite

  return (
    /* Para poder usar el useFetcher debemos de especificar el formulario del cual vamos
    a interceptar la petición.
    Aquí podemos mandar llamar acciones con el formulario incluso cuando el componente
    no esta en una ruta, esto debido a que ejecutara la acción definida en la ruta que 
    utilice este componente. */
    <fetcher.Form method='post'>
      <button
        aria-label={
          favorite
            ? 'Remove from favorites'
            : 'Add to favorites'
        }
        name='favorite'
        value={favorite ? 'false' : 'true'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  )
}
