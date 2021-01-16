import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerCreatePage() {
    const [ formData , setFormData] = useState({})
    const { history, setListUpToDate } = useContext(UserContext)

    function renderInput(name, label, type) {
        return (
            <tr>
                <td>
                    <label>{label}</label>
                </td>
                <td>
                    <input
                    type={type || "text"}
                    name={name}
                    onChange={handleOnChange}
                    />
                </td>
            </tr>
        )
    }

    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        setListUpToDate(false)
        FetchKit.createCustomer(formData)
        .then(data => {
            if (data.status === 403) alert("You cannot have more than 10 customers")
            history.push('/home')
        })
    }

    return (
        <div>
            <h1>Create Customer</h1>
            <form onSubmit={handleOnSubmit}>
                <table>
                    <tbody>
                        {renderInput("name", "Customer Name")}
                        {renderInput("email", "Customer Email", "email")}
                        {renderInput("organisationNr", "Organisation Number")}
                        {renderInput("paymentTerm", "Payment Term", "number")}
                        {renderInput("phoneNumber", "Phone Number", "tel")}
                        {renderInput("reference", "Reference")}
                        {renderInput("vatNr", "VAT Number")}
                        {renderInput("website", "Website", "url")}
                    </tbody>
                </table>
                <button type="submit">Create Customer</button>
            </form>
            <code>{JSON.stringify(formData)}</code>
        </div>
    )
}
