/* NOTE: El nombre del archivo tiene un _ después de contactId, esto es porque
por defecto en Remix todas las rutas con el mismo prefijo de nombre serán
nested routes, y cuando usamos un _ antes de un nombre de ruta, le indicamos
a Remix que esa ruta no es nested. */

import { json, redirect, type ActionArgs, type LoaderArgs } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { getContact, updateContact, type ContactRecord } from '../data/data'

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.contactId, 'Missing contactId param')
  const contact = await getContact(params.contactId)
  
  if (!contact) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ contact })
}

export const action = async ({ params, request }: ActionArgs) => {
  invariant(params.contactId, 'Missing contactId param')
  
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)

  await updateContact(params.contactId, updates)

  return redirect(`/contacts/${params.contactId}`)
}

export default function EditContact() {
  const { contact } = useLoaderData<{ contact: ContactRecord }>()

  return (
    <Form id='contact-form' method='post'>
      <p>
        <span>Name</span>

        <input
          defaultValue={contact.first}
          aria-label='First name'
          name='first'
          type='text'
          placeholder='First'
        />

        <input
          aria-label='Last name'
          defaultValue={contact.last}
          name='last'
          placeholder='Last'
          type='text'
        />
      </p>

      <label>
        <span>Twitter</span>

        <input
          defaultValue={contact.twitter}
          name='twitter'
          placeholder='@jack'
          type='text'
        />
      </label>

      <label>
        <span>Avatar URL</span>

        <input
          aria-label='Avatar URL'
          defaultValue={contact.avatar}
          name='avatar'
          placeholder='https://example.com/avatar.jpg'
          type='text'
        />
      </label>

      <label>
        <span>Notes</span>

        <textarea
          defaultValue={contact.notes}
          name='notes'
          rows={6}
        />
      </label>
      
      <p>
        <button type='submit'>Save</button>
        <button type='button'>Cancel</button>
      </p>
    </Form>
  )
}
