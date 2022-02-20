const db = require("../model/index.model");
const CompanyDB = db.companies;

exports.createCompany = async (data) => {
  data["Name"] = data["Name"].toLowerCase()
  let result = await CompanyDB.create(data)
  return result
};

exports.getCompany = async (company=undefined) => {
    let result;
    if (company){
        result = await CompanyDB.findByPk(company)
        return result
    }
    result = await CompanyDB.findAll();
    return result
};

exports.deleteCompany = async (company) => {
    let result = await CompanyDB.destroy({
        where : {Name : company} 
    })
    return result
};

exports.updateCompany = async (data) => {
    let result = await CompanyDB.update(data,{ 
        where : {Name : data["Name"]} 
    })
    return result
};