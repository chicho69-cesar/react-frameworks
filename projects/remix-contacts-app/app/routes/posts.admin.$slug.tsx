import { useEffect, useId, useState } from 'react'
import { Form, useActionData, useLoaderData, useNavigation } from '@remix-run/react'
import { json, redirect } from '@remix-run/node'
import type { LoaderFunction, ActionFunction, V2_MetaFunction } from '@remix-run/node'
import invariant from 'tiny-invariant'

import { type Post, deletePost, getPost, updatePost } from '~/models/post.server'

export const loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, 'Slug is required')

  const post = await getPost(params.slug)
  invariant(post, `Post not found: ${params.slug}`)

  return json({ post })
}

export const action: ActionFunction = async ({ params, request }) => {
  invariant(params.slug, 'Slug is required')

  const formData = await request.formData()
  const { title, slug, markdown, intent } = Object.fromEntries(formData)

  if (intent === 'delete') {
    const isDeleted = await deletePost(params.slug)
    return isDeleted ? 
      redirect('/posts/admin') : 
      json(
        { message: 'Post not found' },
        { status: 404 }
      )
  }

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

  const updatedPost = await updatePost(params.slug, title, slug, markdown)

  return updatedPost ? 
    redirect('/posts/admin') : 
    json(
      { message: 'Error while deleting post' }, 
      { status: 400 }
    )
}

export const meta: V2_MetaFunction = () => {
  return [
    { title: 'Admin page' }
  ]
}

const inputClassName = 'w-full rounded border border-gray-500 px-2 py-1 text-md text-gray-700 font-normal outline-none'

export default function PostsAdminSlugPage() {
  const { post } = useLoaderData<typeof loader>()
  const errors = useActionData<typeof action>()
  const navigation = useNavigation()

  const [titleValue, setTitleValue] = useState('')
  const [slugValue, setSlugValue] = useState('')
  const [markdownValue, setMarkdownValue] = useState('')
  const markdownId = useId()

  useEffect(() => {
    setTitleValue(post.title)
    setSlugValue(post.slug)
    setMarkdownValue(post.markdown)
  }, [post])

  const isSubmitting = Boolean(navigation.state === 'submitting')

  return (
    <Form method='post'>
      <p className='mb-3 text-red-600'>
        {(errors as { message: string } | undefined)?.message}
      </p>

      <p className='mb-3 text-gray-500 font-bold'>
        <label>
          Post Title:{' '}
          {(errors as Post)?.title ? (
            <em className='text-red-600'>{(errors as Post).title}</em>
          ) : null}

          <input
            type='text'
            name='title'
            value={titleValue}
            onChange={(event) => setTitleValue(event.target.value)}
            autoComplete='off'
            className={inputClassName}
          />
        </label>
      </p>

      <p className='mb-3 text-gray-500 font-bold'>
        <label>
          Post Slug:{' '}
          {(errors as Post)?.slug ? (
            <em className='text-red-600'>{(errors as Post).slug}</em>
          ) : null}

          <input
            type='text'
            name='slug'
            value={slugValue}
            onChange={(event) => setSlugValue(event.target.value)}
            autoComplete='off'
            className={inputClassName}
          />
        </label>
      </p>

      <p className='mb-3 text-gray-500 font-bold'>
        <label htmlFor={markdownId}>
          Markdown:{' '}
          {(errors as Post)?.markdown ? (
            <em className='text-red-600'>{(errors as Post).markdown}</em>
          ) : null}
        </label>
        <br />

        <textarea
          name='markdown'
          id={markdownId}
          rows={12}
          value={markdownValue}
          onChange={(event) => setMarkdownValue(event.target.value)}
          autoComplete='off'
          className={`${inputClassName} font-mono`}
        />
      </p>

      <div className='flex justify-end items-center gap-4'>
        <button
          type='submit'
          name='intent'
          value='delete'
          disabled={isSubmitting}
          className='rounded bg-red-500  py-2 px-4 text-white hover:bg-red-600 focus:bg-red-400 disabled:bg-red-300'
        >
          Delete post
        </button>

        <button
          type='submit'
          name='intent'
          value='update'
          disabled={isSubmitting}
          className='rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300'
        >
          Update post
        </button>
      </div>
    </Form>
  )
}
