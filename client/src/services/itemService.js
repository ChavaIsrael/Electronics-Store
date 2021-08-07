import { v4 as uuid } from 'uuid'

const API_URL = "http://localhost:8080"
const API_HEADERS = {
   "Content-Type": "application/json",
   Accept: "application/json",
}


//get details of items in user's cart ^
export const getItems = (userItems) => {
   return fetch(`${API_URL}/items?${userItems.map(p => "id=" + p.itemId).join("&")}`)
      .then((res) => res.json())
      .then(res => {
         return userItems.map(uItem => {
            const item = res.find((Item) => uItem.itemId === Item.id)
            return { ...item, itemCount: uItem.itemCount }
         })
      })
}

//get items in categorty in shop ^
export const getItemsList = (items) => {
   return fetch(`${API_URL}/items?itemCategory=${items}`)
      .then(res => res.json())
      .catch((e) => console.log(e))
      }


      
//Get user's cart by his email ^
export const getUserItemCart = (userEmail) => {
   return fetch(`${API_URL}/usersCart?userEmail=${userEmail.toLowerCase()}`)
       .then((res) => res.json())
       .then((up) => {
           if (!up.length) return [];
           return getItems(up)
       })
       .catch((e) => console.log(e))
   }

//get item in user's cart ^
export const getUserItemList = (userEmail, itemId) => {
   return fetch(`${API_URL}/usersCart?userEmail=${userEmail.toLowerCase()}&itemId=${itemId}`)
      .then(res => res.json())
      .then((up) => {
         return up ? up[0] : null
      })
      .catch((e) => console.log(e))
      }

//update item's amount in user's cart ^
export const updateUserItem = (userItems) => {
   return fetch(`${API_URL}/usersCart?id=${userItems.id}`, {
      headers: API_HEADERS,
      method: "PUT",
      body: JSON.stringify(userItems),
   })
      .then((res) => res.json())
      .catch((e) => console.log(e))
      }

//create item in user's cart ^
export const createUserItem = (userItems) => {
   return fetch(`${API_URL}/usersCart`, {
      headers: API_HEADERS,
      method: "POST",
      body: JSON.stringify(userItems)
   })
      .then((res) => res.json())
}

//delete item of user's cart ^
export const deleteUserItem = (res) =>{
   return fetch(`${API_URL}/usersCart?id=${res._id}`, {
      method: "DELETE",
   })
      .then((res) => res.json())
      .catch((e) => console.log(e))
      }

//update user's cart ^
export const updateUserCart = (userEmail, itemId, countAdd) => {
   return getUserItemList(userEmail, itemId).then(res => {
      if (res) {
            if (res.itemCount +  countAdd > 0) {
            updateUserItem({
               id: res._id,
               userEmail,
               itemId,
               itemCount: res.itemCount + countAdd
            })
         } else {
            deleteUserItem(res)
         }
      } else {
         createUserItem(
            {
               id: uuid(),
               userEmail:userEmail.toLowerCase(),
               itemId,
               itemCount: 1
            })
      }
   });
}
