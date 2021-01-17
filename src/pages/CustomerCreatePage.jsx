import React, { useContext, useState } from 'react'
import FormEdit from '../components/FormEdit'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerCreatePage() {
    const [ formData , setFormData] = useState({})
    const { history, setListUpToDate } = useContext(UserContext)
    
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
                <UserContext.Provider value={{formData, setFormData}}>
                    <FormEdit />
                </UserContext.Provider>
                <p>*required</p>
                <button type="submit">Create Customer</button>
            </form>
        </div>
    )
}
