import React, { useContext, useEffect, useState } from 'react'
import FormEdit from '../components/FormEdit'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerUpdatePage(props) {
    const customerId = props.match.params.id
    const [ formData, setFormData ] = useState({})
    const { history , setListUpToDate, tempCustomer } = useContext(UserContext)

    function getCustomerItem() {
        FetchKit.getCustomerItem(customerId)
        .then(data => setFormData(data))
    }

    useEffect(() => {
        if (tempCustomer) {
            if (tempCustomer.id === parseInt(customerId)) {
                setFormData(tempCustomer)
            }
        } else {
            getCustomerItem()
        }
    }, [])

    function handleOnSubmit(e) {
        e.preventDefault()
        setListUpToDate(false)
        FetchKit.updateCustomerItem(customerId, formData)
        .then(() => history.push(`/customers/${customerId}`))
    }
    
    return (
        <div className="p-3">
            <div className="row">
                <h1>Update Customer</h1>
            </div>
            <div className="row">

            <form onSubmit={handleOnSubmit} className="justify-content-md-center">
                <UserContext.Provider value={{formData, setFormData}}>
                    <FormEdit />
                </UserContext.Provider>
                <p>*required</p>
                <button type="submit">Save Changes</button>
            </form>
            </div>
        </div>
    )
}
