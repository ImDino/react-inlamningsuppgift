import formFormat from '../data/form@'

export const text = {
    name: "You must enter a name.",
    paymentTerm: "Must be a number higher than 0.",
    vatNr: `Must start with "SE" (capital letters) followed by 10 digits.`
}

export default class FormRequirements {

    static check(field, value) {
        if (typeof this[field] == "function") {
            return this[field](value)
        }
        else return false
    }

    static checkAll(input) {
        let result = {}
        formFormat.forEach((item) => {
            if(item.required) {
                if (input[item.key] === null || input[item.key] === undefined) {
                    result[item.key] = true
                }
                else result[item.key] = this.check(item.key, input[item.key])
            }
        })
        return result
    }

    static name(input) {
        if (input==="") {
            return true
        }
        else return false
    }

    static paymentTerm(input) {
        if (input==="" || input < 1) {
            return true
        }
        else return false
    }

    static vatNr(input) {
        const firstTwo = input.slice(0,2)
        const rest = parseInt(input.slice(2,12))
        const result = firstTwo+rest
        
        if (firstTwo === "SE" && result.length === 12 && input.length === 12) {
            return false
        }
        else return true
    }

    static message(field) {
        return text[field]
    }
}