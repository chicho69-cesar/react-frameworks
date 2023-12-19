import { redirect, type ActionFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { deleteContact } from '~/data/data'

export const action: ActionFunction = async ({ params }) => {
  invariant(params.contactId, 'Missing contactId param')
  await deleteContact(params.contactId)

  return redirect('/')
}
