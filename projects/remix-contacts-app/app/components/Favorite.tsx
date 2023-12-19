import { useFetcher } from '@remix-run/react'
import type { FunctionComponent } from 'react'

import type { ContactRecord } from '~/data/data'

interface Props {
  contact: Pick<ContactRecord, 'favorite'>
}

export const Favorite: FunctionComponent<Props> = ({ contact }) => {
  const fetcher = useFetcher()
  const favorite = contact.favorite

  return (
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
