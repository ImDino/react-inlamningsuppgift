import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

import 'bootstrap/js/src/collapse.js';
import FetchKit from './data/fetchKit'
import Navbar from './components/Navbar'

export default function App() {
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userInfo , setUserInfo ] = useState(null)
  const [ customerList, setCustomerList ] = useState(null)
  const [ listUpToDate, setListUpToDate ] = useState(false)
  const [ tempCustomer, setTempCustomer ] = useState()
  const history = useHistory()

  useEffect(() => {
    if (history.location.pathname === "/") {
      history.push("/login")
    }
    else if (localStorage.getItem("token")) {
      checkIfSignedIn()
    }
    else {
      history.push("/login")
    }
  }, [])
  
  function checkIfSignedIn() {
    FetchKit.getCurrentUserInfo()
    .then(data => {
      if (data) {
        setLoggedIn(true)
        setUserInfo(data)
      }
    })
  }
  
  return (
    <UserContext.Provider 
      value={{loggedIn, setLoggedIn,
              customerList, setCustomerList,
              listUpToDate, setListUpToDate,
              history, userInfo, setUserInfo,
              tempCustomer, setTempCustomer}}
      >
      <div>
        <Navbar />
        <div className="container d-flex justify-content-center mt-5 mb-5">

        <Switch>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/home">
            <HomePage />
          </Route>

          <Route path="/profile">
            <ProfilePage />
          </Route>

          <Route path="/customers/create">
            <CustomerCreatePage />
          </Route>

          <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

          <Route path="/customers/:id" component={CustomerDetailPage} />

        </Switch>
        </div>
      </div>
    </UserContext.Provider>
  )
}

/*


TODO Skapa styled components, Ärv CSS-properties en styled-component

TODO ta bort förinställd epost o lösen
*/