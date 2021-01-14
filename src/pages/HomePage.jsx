import React, { useContext, useEffect } from 'react'
import CustomerListItem from '../components/CustomerListItem'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'
import { useHistory } from 'react-router-dom'

export default function HomePage() {
    const { customerList, setCustomerList } = useContext(UserContext)
    const { loggedIn, setLoggedIn } = useContext(UserContext) // kan ta bort setLoggedin?
    const history = useHistory()
    
    useEffect(() => {
        if(loggedIn) {
            getCustomerList()
        }
    }, [loggedIn])

    function getCustomerList() {
        FetchKit.getCustomerList()
        .then(res => checkStatus(res).json())
        .then(data => setCustomerList(data.results))
    }
    function checkStatus(fetchResponse) {
        if (!fetchResponse.ok) {
          history.push('/login')
          return null
        }
        return fetchResponse
      }

    return (
        
        <div>
            {customerList
                ?(
                    customerList.map((item, index) => {
                        console.log(item)
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