//put the user's details in localStorage
const LocalStorage = (firstName, email, itemsCart) => {
    localStorage.setItem("currentUserName", firstName)
    localStorage.setItem("currentUserEmail", email.toLowerCase())
    localStorage.setItem("currentUserCartNumber", itemsCart>0? itemsCart:  0)
}

export default LocalStorage
