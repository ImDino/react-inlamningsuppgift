import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

import 'bootstrap/js/src/collapse.js';
import FetchKit from './data/fetchKit'

export default function App() {
  const [ customerList, setCustomerList ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userInfo , setUserInfo ] = useState(null)
  const [ listUpToDate, setListUpToDate ] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (history.location.pathname == "/") {
      history.push("/login")
    }
    if (localStorage.getItem("token")) {
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

  function logOut() {
    setLoggedIn(false)
    setListUpToDate(false)
    localStorage.removeItem("token")
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {loggedIn
        ?(
          <Link to="/home" className="navbar-brand">My App</Link>
        )
        :(
          <span className="navbar-brand">My App</span>
        )}
        {loggedIn &&
        (
        <>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/home">Home</Link>
            <Link to="/customers/create">Create Customer</Link>
            <Link to="/profile">My Profile ({userInfo && userInfo.firstName+" "+userInfo.lastName})</Link>
            <Link onClick={logOut} to="/login">Log out</Link>
          </div>
        </div>
        </>
        )}
      </nav>

      <UserContext.Provider value={{customerList, setCustomerList, loggedIn, setLoggedIn, history, userInfo, setUserInfo, listUpToDate, setListUpToDate}}>
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
      </UserContext.Provider>

    </div>
  )
}

/*


TODO gör så loggedIn styr om innehåll visas
TODO dölja hela sidor = helfärgad bakgrund med spinner och lite delay

EXTRAs
sökfunktion, kolla exempelvis https://www.youtube.com/watch?v=XZScIWYIkNw 

 Krav:

TODO Skapa styled components, Ärv CSS-properties en styled-component

TODO VatNR - Validera så att detta fält innehåller "SE" och därefter 10 siffror

TODO paymentTerm (betalningsvillkor i dagar. En siffra måste alltid skickas med)

TODO Visa vilken användare som är inloggad ( api/v1/me ) Visa den inloggade användarens email, förnamn och efternamn.
*/