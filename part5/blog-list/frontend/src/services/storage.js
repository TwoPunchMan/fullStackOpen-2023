const KEY = 'blogAppUser'

const loadUser = () => {
  const user = window.localStorage.getItem(KEY)
  return JSON.parse(user)
}

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export default {
  loadUser,
  saveUser,
  removeUser
}
