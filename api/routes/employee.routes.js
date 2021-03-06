// Importing the module
const express=require("express")
const logger = require("../config/winston.config")
const employeeService = require("../services/employee.service")
const authMiddleware = require("../middlewares/auth.middleware")
const validator = require("../utils/validator.util")
// Creating express Router
const router=express.Router()
  
// Handling login request
router
.post("/", authMiddleware,(req,res)=>{
    logger.info("Creating  new employee")
    let isValid = validator.employeePayloadValidator(req.body)
    if (isValid){
        req.body["CompanyName"] = req.body["CompanyName"].toLowerCase()
    let result = employeeService.createEmployee(req.body)
    result.then(data=>{
        return res.status(201).json({
            "msg": "Success",
            "data": data
        })
        
    })
    .catch(err => {
        logger.error(JSON.stringify(err));
        if (err.hasOwnProperty('errors')) {
            err =  err["errors"][0]["message"]
        }
        if (err.hasOwnProperty('parent')) {
            err =  err["parent"]["detail"]
        }
        return res.status(400).json({
            "msg": "Failed",
            "reason": err
        })
    })
    }
    else{
        return res.status(400).json({
            "msg": "Failed",
            "reason": "Validation failed"
        }) 
    }
    
    
   
})
.get("/:id", (req,res) => {
    logger.info("Get Employee details by employee id "+ req.params.id);
    let result = employeeService.getEmployee(req.params.id)   
    result.then(data=> {
        if (data){
            return res.status(200).json({
                "msg": "Success",
                "data": data
            })
        }
        throw 'unable_to_fetch_the_employee_details_by_id'
        
    })
    .catch(err => {
        logger.error("Error fetching the employee details by empID")
        return res.status(400).json({
            "msg": "Failed",
            "reason": err
        })
    })
})

.get("/", authMiddleware, (req,res) => {
    
    let result;
    if (req.query.company){
        result = employeeService.getEmployeeByCompany(req.query.company)
    }
    else{
        result = employeeService.getEmployee()
    }
    
    result.then(data=> {
        if (data){
            return res.status(200).json({
                "msg": "Success",
                "data": data
            })
        }
        throw 'unable_to_fetch_the_employee_details'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})
.delete("/:id", authMiddleware, (req,res) => {
    let result;
    logger.info("Deleting a employee with id ")
    result = employeeService.deleteEmployee(req.params.id)
    
    
    result.then(data=> {
        if (data){
            return res.status(204).end()
        }
        throw 'unable_to_fetch_the_employee'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})
.put("/:id", authMiddleware, (req,res) => {
    let getResult;
    getResult = employeeService.getEmployee(req.params.id)   
    
    
    getResult.then(data=> {
        if (data){
            result = employeeService.updateEmployee(req.body, req.params.id)
            result.then(data=> {
                if (data){
                    return res.status(200).json(req.body)
                }
                throw 'unable_to_update_employee'
                
            })
            .catch(err => {
                return res.status(400).json({
                    "msg": "Failed",
                    "reason": err
                })
            })
        }
        else{
            throw 'unable_to_fetch_employee_detail_by_id'
        }
        
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })  
    
})

module.exports=router