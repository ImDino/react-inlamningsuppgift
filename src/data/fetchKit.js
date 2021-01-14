const url = {
    auth : "https://frebi.willandskill.eu/api-token-auth/",
    customers : "https://frebi.willandskill.eu/api/v1/customers/",
    currentUser : "https://frebi.willandskill.eu/api/v1/me/"
}

function token() {
    return localStorage.getItem("token")
}

export default class FetchKit {

    static login(payload) {
        return fetch(url.auth, {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    static getCurrentUserInfo() {
        return fetch(url.currentUser, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token()}`
          }
        })
    }

    static getCustomerItem(customerId) {
        return fetch(url.customers + customerId +"/", {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        })
    }

    static updateCustomerItem(customerId, formData) {
        return fetch(url.customers + customerId +"/", {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        })
    }

    static getCustomerList() {
        return fetch(url.customers, {
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        })
    }

    static deleteCustomerItem(customerId) {
        return fetch(url.customers + customerId +"/", {
            method: "DELETE",
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        })
    }

    static createCustomer(formData) {
        return fetch(url.customers, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${token()}`
            }
        })
    }
}