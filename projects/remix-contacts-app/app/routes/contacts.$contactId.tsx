import { type LoaderFunction, json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import invariant from 'tiny-invariant'

import { Favorite } from '~/components/Favorite'
import { type ContactRecord, getContact } from '~/data/data'

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
