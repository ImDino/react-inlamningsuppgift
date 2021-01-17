import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'

export default function ProfilePage() {
    const { userInfo , history, setLoggedIn, setListUpToDate, setUserInfo } = useContext(UserContext)

    function logOut() {
        setLoggedIn(false)
        setListUpToDate(false)
        setUserInfo(null)
        localStorage.removeItem("token")
        history.push("/login")
    }
    
    return (
        <div>
            <h1>My profile</h1>
            {userInfo && (
                <>
                <p>Name: {userInfo.firstName+" "+userInfo.lastName}</p>
                <p>Email: {userInfo.email}</p>
                </>
            )}
            <button onClick={logOut}>Log out</button>
        </div>
    )
}
