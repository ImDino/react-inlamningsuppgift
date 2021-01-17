import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

export default function Navbar() {
    const { loggedIn, setLoggedIn, userInfo, setUserInfo, setListUpToDate } = useContext(UserContext)
    
    function logOut() {
        setLoggedIn(false)
        setListUpToDate(false)
        setUserInfo(null)
        localStorage.removeItem("token")
    }
    
    return (
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
                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                        data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                        aria-expanded="false" aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to="/home">Home</Link>
                        <Link to="/customers/create">Create Customer</Link>
                        <Link to="/profile">
                            My Profile ({userInfo && userInfo.firstName+" "+userInfo.lastName})
                        </Link>
                        <Link onClick={logOut} to="/login">Log out</Link>
                    </div>
                </div>
            </>
            )}
        </nav>
    )
}
