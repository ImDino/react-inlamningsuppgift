import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function LoginPage() {
    const [ formData, setFormData ] = useState({
        email: "Dino.Pacariz@yh.nackademin.se",
        password: "javascriptoramverk"
    })
    const [ loginStatus , setLoginStatus ] = useState({
        successful: true
    })
    const { loggedIn, setLoggedIn, history, setUserInfo } = useContext(UserContext)

    function handleOnSubmit(e) {
        e.preventDefault()
        const payload = {
            email: formData.email,
            password: formData.password
        }
        
        FetchKit.login(payload)
        .then(data => {
            if (data) {
                localStorage.setItem("token", data.token)
                setLoggedIn(true)
                getUserInfo()
            }
            else {
                setLoginStatus({successful: false})
            }
        })
    }
    
    function getUserInfo() {
        FetchKit.getCurrentUserInfo()
        .then(data => {
            if (data) {
                setLoggedIn(true)
                setUserInfo(data)
            }
        })
    }

    useEffect(() => {
        if(loggedIn) {
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
