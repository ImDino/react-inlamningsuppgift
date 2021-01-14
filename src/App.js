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
        // console.log(data)
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


  useEffect(() => {
    console.log("push home (App.js)")
    history.push('/home')
  }, [loggedIn])
    
    
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

----STATE PROBLEM?
loggedIn
authorized

ska authorized avgöra om innehåll visas?
vilken roll fyller då logged in?

det beror på vilket som kommer först..

vare sig man auto-auktoriseras eller loggar
in så ska både loggedIn och authorized bli true

authorized ska bestämma om innehåll visas
loggedIn .. wait

behövs ens logged in?
är man authorized behövs inte logged in
och är man authorized så är man logged in


----LÖSNINGAR
authorized-state som finns tillgänglig (useContext) på varje sida,
authorization triggas när App.js renderats.

ingen annan fetch förrän authorized state ändrats

1. Om token inte finns, skicka en till login
om token inte finns och man inte är auktoriserad ska innehållet ändå visas

2. om token finns, auktorisera
3. om auktoriserad fortsätt vara på sidan du är på och visa sidan.
4. om man manuellt url navigerat till login och man är auktoriserad
skicka en till home direkt, är man inte auktoriserad men har token, auktorisera

*/