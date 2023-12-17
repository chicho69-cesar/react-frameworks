import type { FunctionComponent } from 'react'
import { Form } from '@remix-run/react'

import type { ContactRecord } from '~/data/data'

interface Props {
  contact: Pick<ContactRecord, 'favorite'>
}

export const Favorite: FunctionComponent<Props> = ({ contact }) => {
  const favorite = contact.favorite

  return (
    <Form method='post'>
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
    </Form>
  )
}
