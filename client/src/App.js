import './App.css';
import { useState } from "react"
import { Route, Switch } from 'react-router-dom';
import UserContext, { currentUserCartNumber, currentUserEmail, currentUserName } from "./Context/UserContext";
import Items from "./Electra/Categories/Items";
import Cart from "./Electra/Cart/Cart";
import MyForm from './Electra/Login/Form'
import Paypal from "./Electra/Cart/Paypal";
import Error from "./Error/Error";
import Branches from "./Electra/Branches/Branches";
import Header from './Electra/Header/Header';
import Caruosel from './Electra/Caruosel/Caruosel';

function App() {

  //of context
  const [CurrentUser, setCurrentUser] = useState({
    userName: currentUserName(),
    userCartNumber: currentUserCartNumber(),
    userEmail: currentUserEmail()
  })

  //Update the usre's cart
  const setUser = () => {
    setCurrentUser({
      userName: currentUserName(),
      userCartNumber: currentUserCartNumber(),
      userEmail: currentUserEmail()
    })
  }

  //Context'a values
  const values = {
    user:
      CurrentUser,
    setUser
  }

  return (
    <UserContext.Provider value={values}>
      <Header />
      <Switch>
        <Route exact component={Caruosel} path='/' />
        <Route component={Paypal} path='/Cart/paypal' />
        <Route component={Cart} path='/Cart' />
        <Route component={Items} path='/items/:name' />
        <Route component={Branches} path='/Branches' />
        <Route component={() => <MyForm type={'register'} />} path='/Register' />
        <Route component={() => <MyForm type={'forgetPassword'} />} path='/forgotPassword' />
        <Route component= {Error} />
      </Switch>
    </UserContext.Provider >
  )
}

export default App;
