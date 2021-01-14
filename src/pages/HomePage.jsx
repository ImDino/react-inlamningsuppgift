import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import CustomerListItem from '../components/CustomerListItem'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function HomePage() {
    const { customerList, setCustomerList } = useContext(UserContext)
    const { loggedIn, setLoggedIn } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        if(loggedIn) {
            console.log(loggedIn);
            getCustomerList()
        }
    }, [loggedIn])

    function getCustomerList() {
        console.log("fetch Home")
        FetchKit.getCustomerList()
        .then(res => res.json())
        .then(data => setCustomerList(data.results))
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