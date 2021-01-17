import React, { useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import formFormat from '../data/form@'
import FormRequirements from '../data/formRequirements'
import styled from 'styled-components'

const blockInvalidChar = e => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault();

const DynamicInput = styled.input`
    border-color: ${props => props.warning ? "red" : "black"};
    &:focus {
        outline:none;
    }
`

const WarningText = styled.div`
    font-size: 0.8em;
    color: red;
`

export default function FormEdit() {
    const { formData, setFormData } = useContext(UserContext)
    const [ alert, setAlert ] = useState({})
    
    function handleOnChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
        setAlert({...alert, [e.target.name] : FormRequirements.check(e.target.name, e.target.value)})
    }

    function renderInput(name, label, type, key, required) {
        return (
            <div key={key} className="mb-3">
                <label htmlFor={key} className="">{label}{required && "*"}</label>
                <DynamicInput
                    id={key}
                    type={type}
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleOnChange}
                    onKeyDown={(e) => {
                        if(e.target.type === "number") {
                            blockInvalidChar(e)
                        }
                    }}
                    className="w-100 rounded p-2"
                    warning={alert[name]}
                />
                <WarningText>{alert[name] && FormRequirements.message()[name]}</WarningText>
            </div>
        )
    }
    
    return (
        <div className={"form-group"}>
            {formFormat.map((item, index) => {
                return renderInput(item.key, item.display, item.type, index, item.required)
            })}
        </div>
    )
}
