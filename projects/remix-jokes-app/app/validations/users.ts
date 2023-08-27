export function validateUsername(username: string) {
  if (username.length < 3) {
    return 'Usernames must be at least 3 characters long'
  }
}

export function validatePassword(password: string) {
  if (password.length < 6) {
    return 'Passwords must be at least 6 characters long'
  }
}

export function validateUrl(url: string) {
  const urls = ['/jokes', '/']
  if (urls.includes(url)) {
    return url
  }

  return '/jokes'
}
