import { redirect, type ActionFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { deleteContact } from '~/data/data'

/* Cuando en un archivo solo exportamos un action o un loader, la ruta de este archivo
sera como un API endpoint, donde la función loader sera la que se ejecute en el método GET
y la action para los demás métodos como POST, PUT, PATCH, DELETE, etc. */
export const action: ActionFunction = async ({ params }) => {
  invariant(params.contactId, 'Missing contactId param')
  await deleteContact(params.contactId)

  return redirect('/')
}
