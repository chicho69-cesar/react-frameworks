export type Post = {
  slug: string
  title: string
  markdown: string
}

const posts: Post[] = [
  {
    slug: "my-first-post",
    title: "My First Post",
    markdown: `
# This is my first post

Isn't it great?
    `.trim(),
  },
  {
    slug: "90s-mixtape",
    title: "A Mixtape I Made Just For You",
    markdown: `
# 90s Mixtape

- I wish (Skee-Lo)
- This Is How We Do It (Montell Jordan)
- Everlong (Foo Fighters)
- Ms. Jackson (Outkast)
- Interstate Love Song (Stone Temple Pilots)
- Killing Me Softly With His Song (Fugees, Ms. Lauryn Hill)
- Just a Friend (Biz Markie)
- The Man Who Sold The World (Nirvana)
- Semi-Charmed Life (Third Eye Blind)
- ...Baby One More Time (Britney Spears)
- Better Man (Pearl Jam)
- It's All Coming Back to Me Now (Céline Dion)
- This Kiss (Faith Hill)
- Fly Away (Lenny Kravits)
- Scar Tissue (Red Hot Chili Peppers)
- Santa Monica (Everclear)
- C'mon N' Ride it (Quad City DJ's)
    `.trim(),
  },
]

export async function getPosts(): Promise<Post[]> {
  return Promise.resolve(posts)
}

export async function getPost(slug: string): Promise<Post | undefined> {
  return posts.find((post) => post.slug === slug)
}

export async function createPost(
  title: string,
  slug: string,
  markdown: string
): Promise<Post> {
  const newPost = { slug, title, markdown }
  posts.push(newPost)

  return newPost
}

export async function updatePost(
  slugToEdit: string,
  title: string,
  slug: string,
  markdown: string
): Promise<Post | null> {
  const postIndex = posts.findIndex((post) => post.slug === slugToEdit)
  if (postIndex === -1) return null

  const updatedPost = { slug, title, markdown }
  // posts[postIndex] = updatedPost
  posts.splice(postIndex, 1, updatedPost)

  return updatedPost
}

export async function deletePost(slug: string): Promise<boolean> {
  const postIndex = posts.findIndex((post) => post.slug === slug)
  if (postIndex === -1) return false

  posts.splice(postIndex, 1)
  return true
}
