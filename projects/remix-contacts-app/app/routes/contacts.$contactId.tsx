import { Form } from '@remix-run/react'
import { Favorite } from '~/components/Favorite'

export default function Contact() {
  const contact = {
    first: 'Your',
    last: 'Name',
    avatar: 'https://loremflickr.com/200/200',
    twitter: 'your_handle',
    notes: 'Some notes',
    favorite: true,
  }

  return (
    <div id='contact'>
      <div>
        <img
          src={contact.avatar}
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
