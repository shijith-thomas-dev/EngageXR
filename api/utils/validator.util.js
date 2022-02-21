const employeePayloadValidator = (payload) => {
    let mandatory_params = ["Firstname", "Email", "CompanyName"]
    return validateSubset(payload, Array(mandatory_params))
}


const companyPayloadValidator = (payload) => {
    let mandatory_params = ["Name", "Email"]
    return validateSubset(payload, Array(mandatory_params))
}


const validateSubset = (dataObj, mandatoryArr) => {
    let subset = new Set(Object.keys(dataObj));
    return mandatoryArr.some(arr => arr.every(item => subset.has(item)))
}


module.exports = {
    employeePayloadValidator : employeePayloadValidator,
    companyPayloadValidator : companyPayloadValidator
}