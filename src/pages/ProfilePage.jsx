import React, { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { RedButton } from "../style/buttons";

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
        <div className="d-flex flex-column align-items-center">
            <h1 className="mb-5">My profile</h1>
            {userInfo && (
                <>
                <p>Name: {userInfo.firstName+" "+userInfo.lastName}</p>
                <p>Email: {userInfo.email}</p>
                </>
            )}
            <RedButton onClick={logOut} className="mt-3">Log out</RedButton>
        </div>
    )
}
