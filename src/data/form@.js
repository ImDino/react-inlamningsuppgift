const formFormat = [
    {
        key: "name",
        display: "Customer Name",
        type: "text",
        required: true
    },
    {
        key: "email",
        display: "Customer Email",
        type: "email",
        required: false
    },
    {
        key: "organisationNr",
        display: "Organisation Number",
        type: "text",
        required: false
    },
    {
        key: "paymentTerm",
        display: "Payment Term",
        type: "number",
        required: true
    },
    { 
        key: "phoneNumber",
        display: "Phone Number",
        type: "tel",
        required: false
    },
    { 
        key: "reference",
        display: "Reference",
        type: "text",
        required: false
    },
    { 
        key: "vatNr",
        display: "VAT Number",
        type: "text",
        required: true
    },
    { 
        key: "website",
        display: "Website",
        type: "url",
        required: false
    }
]

export default formFormat