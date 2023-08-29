import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function Main({ children }: Props) {
  return (
    <main className='min-h-screen grid place-content-center gap-4'>
      {children}
    </main>
  )
}
