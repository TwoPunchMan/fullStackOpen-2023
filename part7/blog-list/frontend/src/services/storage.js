const KEY = 'blogAppUser'

const saveUser = (user) => {
  localStorage.setItem(KEY, JSON.stringify(user))
}

const loadUser = () => {
  const user = window.localStorage.getItem(KEY)
  return JSON.parse(user)
}

const removeUser = () => {
  localStorage.removeItem(KEY)
}

export default {
  loadUser,
  saveUser,
  removeUser
}
