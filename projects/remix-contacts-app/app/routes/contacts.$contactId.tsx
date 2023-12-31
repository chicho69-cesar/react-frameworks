import { json, type ActionFunction, type LoaderFunction } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { Favorite } from '~/components/Favorite'
import { getContact, updateContact, type ContactRecord } from '~/data/data'

export const loader: LoaderFunction= async ({ params }) => {
  const { contactId } = params
  /* Invariant es una función muy util que nos sirve para validar si tenemos
  un cierto param o no, muy util para ver si se renombro el archivo o algo. */
  invariant(contactId, 'Missing contactId param')

  const contact = await getContact(contactId!)

  if (!contact) {
    throw new Response('Not Found', { status: 404 })
  }

  return json({ contact })
}

export const action: ActionFunction = async ({ params, request }) => {
  const { contactId } = params
  invariant(contactId, 'Missing contactId param')

  const formData = await request.formData()

  return updateContact(contactId, {
    favorite: formData.get('favorite') === "true" 
  })
}

export default function Contact() {
  const { contact } = useLoaderData<{ contact: ContactRecord }>()

  return (
    <div id='contact'>
      <div>
        <img
          src={contact.avatar ?? 'https://loremflickr.com/200/200'}
          alt={`${contact.first} ${contact.last} avatar`}
          key={contact.avatar}
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}

          <Favorite contact={contact} />
        </h1>

        {contact.twitter ? (
          <p>
            <a
              href={`https://twitter.com/${contact.twitter}`}
            >
              {contact.twitter}
            </a>
          </p>
        ) : null}

        {contact.notes ? <p>{contact.notes}</p> : null}

        <div>
          <Form action='edit'>
            <button type='submit'>Edit</button>
          </Form>

          <Form
            action='destroy'
            method='post'
            onSubmit={(event) => {
              /* La función onSubmit en el formulario nos sirve para interceptar el submit
              del formulario antes de realizarlo. */
              const response = confirm(
                'Please confirm you want to delete this record.'
              )

              if (!response) {
                event.preventDefault()
              }
            }}
          >
            <button type='submit'>Delete</button>
          </Form>
        </div>
      </div>
    </div>
  )
}
