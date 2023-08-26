import { json } from '@remix-run/node'

export const badRequest = async <T>(data: T) => {
  return json<T>(data, { status: 400 })
}
