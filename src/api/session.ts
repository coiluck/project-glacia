// セッショントークンの置き場
// localStorageなので盗まれうるけどドメインが別なのでしゃーなし
const TOKEN_KEY = 'glacia:token'

export const getToken = () => localStorage.getItem(TOKEN_KEY)
export const hasToken = () => getToken() !== null
export const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token)
export const clearToken = () => localStorage.removeItem(TOKEN_KEY)
