import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

export default function LoginPage() {
    const [ formData, setFormData ] = useState({
        email: "Dino.Pacariz@yh.nackademin.se",
        password: "javascriptoramverk"
    })
    const [ loginStatus , setLoginStatus ] = useState({
        successful: true
    })
    const history = useHistory()

    function handleOnSubmit(e) {
        e.preventDefault()
        
        const url = "https://frebi.willandskill.eu/api-token-auth/"
        const payload = {
            email: formData.email,
            password: formData.password
        }
        
        fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => checkStatus(res))
        .then(data => {
            if (data) {
                localStorage.setItem("WEBB20", data.token)
                history.push('/home')
            }
            setLoginStatus({successful: false})
        })

        function checkStatus(fetchResponse) {
            if (!fetchResponse.ok) {
                return null
            }
            return fetchResponse.json()
        }
    }
    
    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label>Email</label>
                <input name="email" onChange={handleOnChange} />
                <label>Password</label>
                <input name="password" onChange={handleOnChange} />
                <button type="submit">Log in</button>
                {loginStatus.successful == false &&
                    <p>Login failed, please enter a valid Email {"&"} Password </p>
                }
            </form>
        </div>
    )
}

/*
-TARGETS

1. if WEBB20 doesn't exist, redirect to login page

2. if WEBB20 token exists in localstorage, /api-token-verify/.

3. if manually entering login-page and api token verification is ok, redirect to home

-ACTIONS

1. function for token verification
2. create state for logged-in
3. log out button and it's function
4. re-think useContext
5. re-directing depending on logged-in state
*/