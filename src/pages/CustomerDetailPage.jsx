import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FormDisplay from '../components/FormDisplay'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerDetailPage(props) {
    const customerId = props.match.params.id
    const [ customerItem, setCustomerItem ] = useState(null)
    const [ itemExists, setItemExists] = useState(true)
    const { history , setListUpToDate, setTempCustomer } = useContext(UserContext)

    function getCustomerItem() {
        FetchKit.getCustomerItem(customerId)
        .then(data => {
            if(data) {
                setCustomerItem(data)
                setTempCustomer(data)
            }
            else {
                setItemExists(false)
            }
        })
    }

    function deleteCustomer() {
        setListUpToDate(false)
        FetchKit.deleteCustomerItem(customerId)
        .then(() => history.push('/home'))
    }

    useEffect(() => {
        getCustomerItem()
    }, [])
    
    return (
        <div>
            {!itemExists && (
            <>
                <p>This customer doesn't exist.</p>
                <Link to={"/home"}>Go back.</Link>
            </>
            )}
            {customerItem
                ?(
                    <div>
                        <h1>{customerItem.name}</h1>
                        <FormDisplay data={customerItem} />
                        <button onClick={deleteCustomer}>Delete Customer</button>
                        <Link to={`/customers/${customerId}/edit`}>
                            <button>Update Customer</button>
                        </Link>
                    </div>
                )
                :(
                    <>{itemExists && <span>Loading Data...</span>}</>
                )       
            }
        </div>
    )
}
