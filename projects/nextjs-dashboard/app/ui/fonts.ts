/* Usando el paquete de next/font podemos importar fuentes de muchos lugares, como
por ejemplo las Google fonts. */
import { Inter, Lusitana } from 'next/font/google'

/* Exportamos nuestras fuentes con el paquete de next/font. Haciendo nuestras propias
configuraciones como los caracteres de la fuente y los pesos de la fuente. */
export const inter = Inter({ subsets: ['latin'] })
export const lusitana = Lusitana({
  subsets: ['latin'],
  weight: ['400', '700']
})
