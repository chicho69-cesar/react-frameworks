/* Cuando usamos la directiva use client le decimos a Next que esto sera un 'react client
component', es decir, un componente que se renderizara en el cliente. Esto porque
no se pueden usar hooks en el server, solamente en el client, asi que si queremos usar
los hooks debemos de decirle a Next que esto es un client component.
Los client components ademas se recomienda que sean los mas abajo en el árbol de componentes
posible, esto con el fin de evitar que se renderizen demasiados componentes el cliente
que podrían renderizarse en el servidor. */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline'

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  {
    name: 'Invoices',
    href: '/dashboard/invoices',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
]

export default function NavLinks() {
  /* Usamos el hook usePathname para obtener el pathname actual de la ruta. */
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon

        /* Para hacer navegación en el cliente como si fuera una SPA debemos usar el
        componente Link de Next.js. */
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className='w-6' />
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}
