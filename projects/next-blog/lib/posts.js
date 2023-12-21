import fs from 'node:fs'
import path from 'node:path'

import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Obtenemos los nombres de los archivos en el directorio posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // Eliminamos ".md" del nombre del archivo para obtener el id
    const id = fileName.replace(/\.md$/, '')

    // Leemos el archivo markdown como cadena de texto
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Usamos gray-matter para parsear la sección de metadatos del post
    const matterResult = matter(fileContents)

    // Combinamos los datos con el id
    return {
      id,
      ...matterResult.data,
    }
  })

  // Ordenamos los posts por fecha
  return allPostsData.sort((a, b) => {
    return (a.date < b.date) ? 1 : -1
  })
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContent = fs.readFileSync(fullPath, 'utf8')

  // Usamos gray-matter para parsear la sección de metadatos del post
  const matterResult = matter(fileContent)

  // Usamos remark para convertir el markdown en una cadena de texto HTML
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  // Combinamos los datos con el id y el contenido HTML
  return {
    id,
    contentHtml,
    ...matterResult.data,
  }
}
