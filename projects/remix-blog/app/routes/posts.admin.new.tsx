import { useId } from 'react'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { json, redirect, type ActionArgs, type V2_MetaFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { createPost } from '~/models/post.server'

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  
  const title = formData.get('title')
  const slug = formData.get('slug')
  const markdown = formData.get('markdown')

  const errors = {
    title: title ? null : 'Title is required',
    slug: slug ? null : 'Slug is required',
    markdown: markdown ? null : 'Markdown is required',
  }

  const hasErrors = Object.values(errors).some(
    (errorMessage) => errorMessage
  )

  if (hasErrors) {
    return json(errors, { status: 400 })
  }

  invariant(typeof title === 'string', 'title must be a string')
  invariant(typeof slug === 'string', 'slug must be a string')
  invariant(typeof markdown === 'string', 'markdown must be a string')

  const slugToCreate = slug.toLowerCase().replace(/\s+/g, '-')

  await createPost(
    title, 
    slugToCreate, 
    markdown
  )

  return redirect('/posts/admin')
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Post admin page' }
  ]
}

const inputClassName = 'w-full rounded border border-gray-200 px-2 py-1 text-md text-gray-700 font-normal outline-none'

export default function PostsAdminNewPage() {
  const errors = useActionData<typeof action>()
  const navigation = useNavigation()
  const markdownId = useId()

  const isCreating = Boolean(navigation.state === 'submitting')

  return (
    <Form method='post'>
      <p className='mb-3 text-gray-500 font-bold'>
        <label>
          Post Title:{' '}
          {errors?.title ? (
            <em className='text-red-600'>{errors.title}</em>
          ) : null}

          <input
            type='text'
            name='title'
            placeholder='Titulo...'
            autoComplete='off'
            className={inputClassName}
          />
        </label>
      </p>

      <p className='mb-3 text-gray-500 font-bold'>
        <label>
          Post Slug:{' '}
          {errors?.slug ? (
            <em className='text-red-600'>{errors.slug}</em>
          ) : null}

          <input
            type='text'
            name='slug'
            placeholder='Slug...'
            autoComplete='off'
            className={inputClassName}
          />
        </label>
      </p>

      <p className='mb-3 text-gray-500 font-bold'>
        <label htmlFor={markdownId}>
          Markdown:{' '}
          {errors?.markdown ? (
            <em className='text-red-600'>{errors.markdown}</em>
          ) : null}
        </label>
        <br />

        <textarea
          name='markdown'
          id={markdownId}
          rows={12}
          placeholder='Markdown...'
          autoComplete='off'
          className={`${inputClassName} font-mono`}
        />
      </p>

      <p className='text-right'>
        <button
          type='submit'
          name='intent'
          value='create'
          disabled={isCreating}
          className='rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300'
        >
          {isCreating ? 'Creating...' : 'Create Post'}
        </button>
      </p>
    </Form>
  )
}
