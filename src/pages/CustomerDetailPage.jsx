import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import FetchKit from '../data/fetchKit'

export default function CustomerDetailPage(props) {
    const customerId = props.match.params.id
    const [ customerItem, setCustomerItem ] = useState(null)
    const [ itemExists, setItemExists] = useState(true)
    const { history , setListUpToDate } = useContext(UserContext)

    function getCustomerItem() {
        FetchKit.getCustomerItem(customerId)
        .then(data => {
            if(data) {
                setCustomerItem(data)
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
                        <table>
                            <tbody>
                                <tr>
                                    <td>Organisation Number</td>
                                    <td>{customerItem.organisationNr}</td>
                                </tr>
                                <tr>
                                    <td>Payment Term</td>
                                    <td>{customerItem.paymentTerm}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number</td>
                                    <td>{customerItem.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Reference</td>
                                    <td>{customerItem.reference}</td>
                                </tr>
                                <tr>
                                    <td>VAT Number</td>
                                    <td>{customerItem.vatNr}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>
                                        <a href={`mailto:${customerItem.email}`}>
                                            {customerItem.email}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Website</td>
                                    <td>
                                        <a href={customerItem.website} target="_blank" rel="noreferrer">
                                            {customerItem.website}
                                        </a>
                                    </td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <button onClick={deleteCustomer}>Delete Customer</button>
                        <Link to={`/customers/${customerId}/edit`}>
                            <button>
                                    Update Customer
                            </button>
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
