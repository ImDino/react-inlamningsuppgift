import React, { useContext, useEffect } from 'react'
import CustomerListItem from '../components/CustomerListItem'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function HomePage() {
    const { customerList, setCustomerList, listUpToDate, setListUpToDate } = useContext(UserContext)
    
    useEffect(() => {
        if (!listUpToDate) {
            getCustomerList()
        }
    }, [])

    function getCustomerList() {
        FetchKit.getCustomerList()
        .then(data => {
            if (data) {
                setCustomerList(data.results)
                setListUpToDate(true)
            }
        })
    }

    return (
        <div>
            <h1 className="mb-5 text-center">Customers</h1>
            {listUpToDate
                ?(
                    customerList.map((item) => {
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
