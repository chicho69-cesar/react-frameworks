import '@/app/ui/global.css'

import { Metadata } from 'next'
import { inter } from './ui/fonts'

/* Para definir la metadata en Next debemos de exportar un objeto de tipo Metadata, donde
definiremos los metatags de la aplicación dependiendo el segmento de ruta donde lo usemos. */
export const metadata: Metadata = {
  /* La propiedad title acepta dos tipos diferentes, un string que seria el titulo de este
  segmento de ruta, y un objeto, donde tenemos un template que funcionara como template
  para el titulo de las rutas hijas, de las cuales se renderizara su title en el apartado
  donde tenemos el %s, y sino tenemos un title en una ruta hija renderizara el default. */
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
}

/* Los Layouts en Next cubren a las paginas, es decir, las paginas se renderizaran en el
children del Layout, asi mismo también tenemos rutas anidadas por lo que los layouts
hijos de otro layout se renderizaran también dentro del layout definido. */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='es'>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
