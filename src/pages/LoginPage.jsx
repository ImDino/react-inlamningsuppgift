import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function LoginPage({func}) {
    const [ formData, setFormData ] = useState({
        email: "Dino.Pacariz@yh.nackademin.se",
        password: "javascriptoramverk"
    })
    const [ loginStatus , setLoginStatus ] = useState({
        successful: true
    })
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    
    const history = useHistory()
    function handleOnSubmit(e) {
        e.preventDefault()
        console.log("fetch login");
        const payload = {
            email: formData.email,
            password: formData.password
        }
        
        FetchKit.login(payload)
        .then(res => checkStatus(res))
        .then(data => {
            if (data) {
                localStorage.setItem("token", data.token)
                setLoggedIn(true)
            }
            else {
                setLoginStatus({successful: false})
            }
        })

        function checkStatus(fetchResponse) {
            if (!fetchResponse.ok) {
                return null
            }
            return fetchResponse.json()
        }
    }
    
    useEffect(() => {
        if(loggedIn) {
            console.log("push home (LoginPage)");
            history.push('/home')
        }
    }, [loggedIn])

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
                {loginStatus.successful === false &&
                    <p>Login failed, please enter a valid Email {"&"} Password </p>
                }
            </form>
        </div>
    )
}
