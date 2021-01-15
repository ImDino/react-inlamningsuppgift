import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'

import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'

import FetchKit from './data/fetchKit'
import 'bootstrap/js/src/collapse.js';

export default function App() {
  const [ customerList, setCustomerList ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ userInfo , setUserInfo ] = useState(null)

  const history = useHistory()
  
  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken()
    }
    else {
      history.push("/login")
    }
  }, [])
  
  function validateToken() {
    FetchKit.getCurrentUserInfo()
    .then(res => checkResponse(res))
    .then(data => {
      if (data) {
        setLoggedIn(true)
        setUserInfo(data)
      }
    }) 
  }
  function checkResponse(fetchResponse) {
    if (!fetchResponse.ok) {
      history.push('/login')
      return null
    }
    return fetchResponse.json()
  }

  function logOut() {
    setLoggedIn(false)
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
            <Link to="/profile">My Profile ({userInfo.firstName+" "+userInfo.lastName})</Link>
            <Link onClick={logOut} to="/login">Log out</Link>
          </div>
        </div>
        </>
        )}
      </nav>

      <UserContext.Provider value={{customerList, setCustomerList, loggedIn, setLoggedIn, history, userInfo}}>
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
på loginPage ska innehållet visas om både loggedIn är false och token saknas

loginPage loggedIn false med token = dölj sidan
loginPage loggedIn true = dölj sidan
loginPage loggedIn true med token = dölj sidan
NOTE loginPage loggedIn false utan token = visa sidan
NOTE om token finns men auktorisering failar måste token tas bort innan redirect
kommer då värdet i denna condition ändras?

TODO dölja hela sidor = helfärgad bakgrund med spinner och lite delay

TODO dölja allt utom navbar
fult om en likadan spinner flyttas ner till separat div o ligger under 
navbar som senare flyttas upp.. bättre att det är en animerande gradient?


TODO navbar 
- logout knapp ska ta bort token, ändra loggedIn till false, navigera till login-page
- visa nuvarande användarens e-mail till vänster om knappen
- man ska kunna klicka på e-posten för o komma till profilePage

TODO profilePage
- ska visa all info om användaren

EXTRAs
sökfunktion, kolla exempelvis https://www.youtube.com/watch?v=XZScIWYIkNw 

*/