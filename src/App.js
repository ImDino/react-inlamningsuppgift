import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory } from 'react-router-dom'
import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { UserContext } from './contexts/UserContext'
import FetchKit from './data/fetchKit'
import 'bootstrap/js/src/collapse.js';
import ProfilePage from './pages/ProfilePage'

export default function App() {
  const [ customerList, setCustomerList ] = useState(null)
  const [ loggedIn, setLoggedIn ] = useState(false)
  const [ appLoaded, setAppLoaded ] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      FetchKit.getCurrentUserInfo()
      .then(res => checkStatus(res))
      .then(data => {
        if (data) {
          console.log(data)
          setLoggedIn(true)
        }
      }) 
    }
    else {
      history.push("/login")
    }
  }, [])

  function checkStatus(fetchResponse) {
    if (!fetchResponse.ok) {
      history.push('/login')
      return null
    }
    return fetchResponse.json()
  }
  

  return (
    <div>
      {loggedIn &&
      (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/home" className="navbar-brand">My App</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to="/home">Home</Link>
            <Link to="/customers/create">Create customer</Link>
            <Link to="/profile">My Profile</Link>
          </div>
        </div>
      </nav>
      )}

      <UserContext.Provider value={{customerList, setCustomerList, loggedIn, setLoggedIn}}>
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