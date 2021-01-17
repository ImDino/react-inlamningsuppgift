import React, { useContext, useState } from 'react'
import FormEdit from '../components/FormEdit'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'
import FormRequirements from '../data/formRequirements'

export default function CustomerCreatePage() {
    const [ formData , setFormData] = useState({})
    const { history, setListUpToDate } = useContext(UserContext)
    const [ alert, setAlert ] = useState({})
    const [ missMessage, setMissMessage ] = useState("")

    function handleOnSubmit(e) {
        e.preventDefault()
        const result = FormRequirements.checkAll(formData)
        
        if (Object.values(result).indexOf(true) > -1) {
            setAlert(result)
            setMissMessage("Please check the required fields.")
            return
        }
        setListUpToDate(false)
        FetchKit.createCustomer(formData)
        .then(data => {
            if (data.status === 403) window.alert("You cannot have more than 10 customers")
            history.push('/home')
        })
    }

    return (
        <div>
            <h1>Create Customer</h1>
            <form onSubmit={handleOnSubmit}>
                <UserContext.Provider value={{formData, setFormData, alert, setAlert}}>
                    <FormEdit />
                </UserContext.Provider>
                <p>*required</p>
                <button type="submit">Create Customer</button>
                <p>{missMessage && missMessage}</p>
            </form>
        </div>
    )
}
