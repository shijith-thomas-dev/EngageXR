// Importing the module
const express= require("express")
const logger = require("../config/winston.config")
const companyService = require("../services/company.service")
  
// Creating express Router
const router=express.Router()
  
// Handling login request
router
.post("/",(req,res)=>{
    logger.info("Inside the create route")
    let result = companyService.createCompany(req.body)
    result.then(data=>{
        if (data.hasOwnProperty('errors')) {
            throw data["errors"][0]["message"]
        }
        return res.status(201).json({
            "msg": "Success",
            "data": data
        })
    })
    .catch(err => {
        logger.error(JSON.stringify(err))
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
    
   
})
.get("/:companyName", (req,res) => {
    let result;
    
    result = companyService.getCompany(req.params.companyName)   
    
    
    result.then(data=> {
        if (data){
            return res.status(200).json({
                "msg": "Success",
                "data": data
            })
        }
        throw 'unable_to_fetch_company'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})
.get("/", (req,res,next) => {
    let result;
    
    result = companyService.getCompany()
    
    result.then(data=> {
        if (data){
            return res.status(200).json({
                "msg": "Success",
                "data": data
            })
        }
        throw 'unable_to_fetch_company'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})
.delete("/:companyName", (req,res) => {
    let result;
    
    result = companyService.deleteCompany(req.params.companyName)   
    
    
    result.then(data=> {
        if (data){
            return res.status(204).end()
        }
        throw 'unable_to_delete_company'
        
    })
    .catch(err => {
        return res.status(404).json({
            "msg": "Failed",
            "reason": err
        })
    })
})
.put("/", (req,res) => {
    let getResult;
    getResult = companyService.getCompany(req.body["Name"])   
    
    
    getResult.then(data=> {
        if (data){
            result = companyService.updateCompany(req.body)
            result.then(data=> {
                if (data){
                    return res.status(200).json(req.body)
                }
                throw 'unable_to_update_company'
                
            })
            .catch(err => {
                return res.status(400).json({
                    "msg": "Failed",
                    "reason": err
                })
            })
        }
        else{
            throw 'unable_to_fetch_company'
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