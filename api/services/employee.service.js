const db = require("../model/index.model");
const EmployeeDB = db.employees;

exports.createEmployee = async (data) => {
  let result = await EmployeeDB.create(data)
  return result
};

exports.getEmployee = async (employeeID=undefined) => {
    let result;
    if (employeeID){
        result = await EmployeeDB.findByPk(employeeID)
        return result
    }
    result = await EmployeeDB.findAll()
    return result
};

exports.deleteEmployee = async (employeeID) => {
  let result = await EmployeeDB.destroy({
      where : {EmployeeID : employeeID} 
  })
  return result
};

exports.updateEmployee = async (data, id) => {
  let result = await EmployeeDB.update(data,{ 
      where : {EmployeeID : id} 
  })
  return result
};

exports.getEmployeeByCompany = async (company) => {
  let result = await EmployeeDB.findAll({
    where : {
      CompanyName : company
      }
    })
  return result
};