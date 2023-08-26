import { Outlet } from '@remix-run/react'

export default function JokesPage() {
  return (
    <div>
      <h1>J🤪KES</h1>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
