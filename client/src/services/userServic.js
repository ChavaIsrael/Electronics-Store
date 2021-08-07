import { v4 } from "uuid"

const API_URL = "http://localhost:8080"
const API_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
}

//check if there is user with those password and password ^
export const getUserByPasswordEmail = (email, pass) => {
    return fetch(`${API_URL}/users?password=${pass.toLowerCase()}&email=${email.toLowerCase()}`)
        .then(res => res.json())
        .catch((e) => console.log(e))
}

//check if there is user with those email and phone ^
export const getUserByPhoneEmail = (email, phone) => {
    return fetch(`${API_URL}/users?phone=${phone}&email=${email.toLowerCase()}`)
        .then(res => res.json())
        .catch((e) => console.log(e))
    }

//Get user by email ^
export const getUserByEmail = (email) => {
    return fetch(`${API_URL}/users?email=${email.toLowerCase()}`)
        .then(res => res.json())
        .catch((e) => console.log(e))
    }

//update user's details ^
export const updateuserDetails = (userDetails) => {
    return fetch(`${API_URL}/users?id=${userDetails._id}`, {
        headers: API_HEADERS,
        method: "PUT",
        body: JSON.stringify(userDetails),
    })
        .then((res) => res.json())
        .catch((e) => console.log(e))
    }

//create new user ^
export const createLog = (user) => {
    return fetch(`${API_URL}/users`, {
        headers: API_HEADERS,
        method: "POST",
        body: JSON.stringify({ id: v4(), password: user.password.toLowerCase(), email: user.email.toLowerCase(), phone: user.phone, firstName: user.firstName, lastName: user.lastName }),
    })
        .then((res) => res.json())
        .catch((e) => console.log(e))
    }