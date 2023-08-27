export function validateJokeName(name: string) {
  if (name.length < 3) {
    return 'That joke\'s name is too short'
  }
}

export function validateJokeContent(content: string) {
  if (content.length < 10) {
    return 'That joke is too short'
  }
}
