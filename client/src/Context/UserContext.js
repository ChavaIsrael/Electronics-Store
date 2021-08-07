
import { createContext } from 'react'

export default createContext({
})

//update current user bylocalStrage 
export const currentUserName = () => {
    const name = localStorage.getItem('currentUserName')
    return name ? name : 'התחברות'
}
export const currentUserEmail = () => {
    const email = localStorage.getItem('currentUserEmail')
    return email ? email : 'התחברות'
}
export const currentUserCartNumber = () => {
    const cart = localStorage.getItem('currentUserCartNumber')
    return cart ? cart : 0
}

