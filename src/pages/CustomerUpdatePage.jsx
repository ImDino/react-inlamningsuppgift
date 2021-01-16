import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'
import formFormat from '../data/form@'

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

    function renderInput(name, label, type, key) {
        return (
            <tr key={key}>
                <td>
                    <label>{label}</label>
                </td>
                <td>
                    <input
                        type={type}
                        name={name}
                        value={formData[name] || ""}
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
        FetchKit.updateCustomerItem(customerId, formData)
        .then(() => history.push(`/customers/${customerId}`))
    }

    return (
        <div>
            <h1>Update Customer</h1>
            <form onSubmit={handleOnSubmit}>
                <table>
                    <tbody>
                        {formFormat.map((item, index) => {
                            return renderInput(item.key, item.display, item.type, index)
                        })}
                    </tbody>
                </table>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    )
}
