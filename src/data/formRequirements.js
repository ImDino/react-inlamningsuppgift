

export default class FormRequirements {

    static check(field, value) {
        if (typeof this[field] == "function") {
            return this[field](value)
        }
        else return false
    }

    static name(input) {
        if (input==="") {
            return true
        }
        else return false
    }

    static paymentTerm(input) {
        if (input==="") {
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

}