import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'
import { MyButton } from "../style/buttons";

export default function LoginPage() {
    const [ formData, setFormData ] = useState({
        email: "",
        password: ""
    })
    const [ loginSuccessful , setLoginSuccessful ] = useState(true)
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
                setLoginSuccessful(false)
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
    
    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        if(loggedIn) {
            history.push('/home')
        }
    }, [loggedIn])

    return (
        <div>
            <form onSubmit={handleOnSubmit} className="d-flex flex-column align-content-center">
                <h1 className="mb-5">Welcome to my app</h1>
                <div className="row mb-2">
                    <label className="col-md-4 pl-0">Email</label>
                    <input className="col-md-8" name="email" onChange={handleOnChange} />
                </div>
                <div className="row">
                    <label className="col-md-4 pl-0">Password</label>
                    <input className="col-md-8" name="password" onChange={handleOnChange} />
                </div>
                <div>
                    <MyButton className="mt-4 w-100" type="submit">Log in</MyButton>
                </div>
                {!loginSuccessful &&
                    <p>Login failed, please enter a valid Email {"&"} Password </p>
                }
            </form>
        </div>
    )
}
