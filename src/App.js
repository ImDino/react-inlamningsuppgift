import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { UserContext } from './contexts/UserContext'
import FetchKit from './data/fetchKit'

export default function App() {
  const [ customerList, setCustomerList ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ appLoaded, setAppLoaded ] = useState(false)
  const history = useHistory()

  useEffect(() => {
    console.log("app.js rendered")
    if (localStorage.getItem("token")) {
      FetchKit.getCurrentUserInfo()
      .then(res => checkStatus(res))
      .then(data => {
        console.log("fetch App")
        if (data) {
          setLoggedIn(true)
        }
      }) 
    }
    else {
      console.log("push login 2 (App.js)")
      history.push("/login")
    }
  }, [])

  
  function checkStatus(fetchResponse) {
    if (!fetchResponse.ok) {
      console.log("push login (App.js)")
      history.push('/login')
    }
    return fetchResponse.json()
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/customers/create">Create customer</Link>
        </li>
      </ul>
      
      <UserContext.Provider value={{customerList, setCustomerList, loggedIn, setLoggedIn}}>
        <Switch>

          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/home">
            <HomePage />
          </Route>

          <Route path="/customers/create">
            <CustomerCreatePage />
          </Route>

          <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

          <Route path="/customers/:id" component={CustomerDetailPage} />

        </Switch>
      </UserContext.Provider>

      <hr/>
    </div>
  )
}

/*

*/