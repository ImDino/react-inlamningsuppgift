import React, { useContext, useEffect } from 'react'
import CustomerListItem from '../components/CustomerListItem'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function HomePage() {
    const { customerList, setCustomerList, loggedIn, setLoggedIn, history } = useContext(UserContext)
    
    useEffect(() => {
        if(localStorage.getItem("token")) {
            getCustomerList()
        } else {
            history.push("/login")
        }
    }, [])

    function getCustomerList() {
        FetchKit.getCustomerList()
        .then(res => checkResponse(res))
        .then(data => {
            if (data) {
                setCustomerList(data.results)
            }
        })
    }
    function checkResponse(fetchResponse) {
        if (!fetchResponse.ok) {
            setLoggedIn(false)
            history.push('/login')
            return null
        }
        return fetchResponse.json()
    }

    return (
        
        <div>
            {customerList
                ?(
                    customerList.map((item, index) => {
                        return <CustomerListItem key={item.id} customerData={item} />
                    })
                )
                :(
                    <p>Loading...</p>
                )
            }
        </div>
    )
}

/*
userinfo & validation & customerlist. alla dessa behövs i homepage, som är startsidan

lösningen på validering i överlag på alla sidor är misslyckade/lyckade fetches
varje misslyckad fetch visar 


GET CURRENT URL

history.location.pathname
*/