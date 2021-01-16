import React from 'react'
import formFormat from '../data/form@'

function renderRow(name, value, type, index) {
    if(name === "Customer Name") return
    return (
        <tr key={index}>
            <td key={index}>{name}</td>
            <td>
                {(type==="text" || type==="number") && 
                    <>{value}</>
                } 
                {type==="tel" && 
                    <a href={`tel:${value}`}>
                        {value}
                    </a>
                }
                {type==="url" &&
                    <a href={value} target="_blank" rel="noreferrer">
                        {value}
                    </a>
                }
                {type==="email" &&
                    <a href={`mailto:${value}`}>
                        {value}
                    </a>
                }
            </td>
        </tr>
    )
}

export default function FormDisplay({data}) {
    return (
        <table>
            <tbody>
                {formFormat.map((item, index) => {
                    return renderRow(item.display, data[item.key], item.type, index)
                })}
            </tbody>
        </table>
    )
}
