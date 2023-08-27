export function validateJokeName(name: string | null) {
  if (name == null) {
    return 'That joke needs a name'
  }

  if (name.length < 3) {
    return 'That joke\'s name is too short'
  }
}

export function validateJokeContent(content: string | null) {
  if (content == null) {
    return 'That joke needs content'
  }

  if (content.length < 10) {
    return 'That joke is too short'
  }
}
