const express = require('express')
const companyRoute = require('./routes/company.routes')
const employeeRoute = require('./routes/employee.routes')
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const winston = require("./config/winston.config")
const port = 3000
const corsOptions = {
    origin: "http://localhost:3000"
  };
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', { stream: winston.stream }));

const db = require("./model/index.model");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

app.use("/",(req,res,next) => {
    console.log("middleware")
    next()
})

BASE_PATH = "/api/v1"

app.use(BASE_PATH+"/company", companyRoute)
app.use(BASE_PATH+"/employee", employeeRoute)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
