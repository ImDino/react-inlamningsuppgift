import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerUpdatePage(props) {
    const customerId = props.match.params.id
    const [ formData, setFormData ] = useState({})
    const { history , setListUpToDate } = useContext(UserContext)
    
    function getCustomerItem() {
        FetchKit.getCustomerItem(customerId)
        .then(data => setFormData(data))
    }

    useEffect(() => {
        getCustomerItem()
    }, [])

    function renderInput(name, label, type) {
        return (
            <div>
                <label>{label}</label>
                <input
                    type={type || "text"}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleOnChange}
                />
            </div>
        )
    }

    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        setListUpToDate(false)
        FetchKit.updateCustomerItem(customerId, formData)
        .then(() => history.push(`/customers/${customerId}`))
    }

    return (
        <div>
            <h1>Update Customer</h1>
            <form onSubmit={handleOnSubmit}>
                {renderInput("name", "Customer Name")}
                {renderInput("email", "Customer Email", "email")}
                {renderInput("organisationNr", "Organisation Number")}
                {renderInput("paymentTerm", "Payment Term", "number")}
                {renderInput("phoneNumber", "Phone Number", "tel")}
                {renderInput("reference", "Reference")}
                {renderInput("vatNr", "VAT Number")}
                {renderInput("website", "Website", "url")}
                <button type="submit">Update Customer</button>
            </form>
        </div>
    )
}
