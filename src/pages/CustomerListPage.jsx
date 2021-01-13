import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CustomerListItem from '../components/CustomerListItem'

export default function CustomerListPage() {
    const [ customerList, setCustomerList ] = useState()
    const history = useHistory()
    
    useEffect(() => {
        getCustomerList()
    }, [])

    function getCustomerList() {
        const url = "https://frebi.willandskill.eu/api/v1/customers/"
        const token = localStorage.getItem("WEBB20")
        
        fetch(url, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token}`
            }
        })
        .then(res => checkStatus(res))
        .then(data => {
            if (data) {
                setCustomerList(data.results)
            }
        })

        function checkStatus(fetchResponse) {
            if (!fetchResponse.ok) {
                history.push('/login')
            }
            return fetchResponse.json()
        }
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