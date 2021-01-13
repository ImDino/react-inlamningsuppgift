import React, { useEffect, useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import CustomerCreatePage from './pages/CustomerCreatePage'
import CustomerDetailPage from './pages/CustomerDetailPage'
import CustomerListPage from './pages/CustomerListPage'
import CustomerUpdatePage from './pages/CustomerUpdatePage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'

export default function App() {
  const history = useHistory()

  useEffect(() => {
    console.log("app.js")
    
  }, [])

  const [ userAuthStatus, setUserAuthStatus] = useState({
    loggedIn: false
  })

  function userAuthentication() {
    const url = "https://frebi.willandskill.eu/api/v1/me/"
    
    const token = localStorage.getItem("WEBB20")

    fetch(url, {
      headers: {
        "Content-Type" : "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(res => checkStatus(res))
    .then(data => {
      if (data) {
        // setCustomerList(data.results)
      }
    })

    function checkStatus(fetchResponse) {
      if (!fetchResponse.ok) {
        history.push('/login')
      }
      return fetchResponse.json()
    }
  }

  return (
    <div>
      <ul>
        <li>
          <Link to="/customers">Customers</Link>
        </li>
        <li>
          <Link to="/customers/create">Create customer</Link>
        </li>
      </ul>

      <Switch>

        <Route path="/home">
          <HomePage />
        </Route>
        
        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/customers/create">
          <CustomerCreatePage />
        </Route>

        <Route path="/customers/:id/edit" component={CustomerUpdatePage} />

        <Route path="/customers/:id" component={CustomerDetailPage} />

        <Route path="/customers">
          <CustomerListPage />
        </Route>

        <Route>
          {history.push("/login")}
        </Route>

      </Switch>

      <hr/>
    </div>
  )
}
