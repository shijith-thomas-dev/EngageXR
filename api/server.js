const express = require('express')
const companyRoute = require('./routes/company.routes')
const employeeRoute = require('./routes/employee.routes')
const authRoute = require("./routes/auth.routes")
const app = express()
const cors = require("cors")
const morgan = require("morgan")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
const winston = require("./config/winston.config")
const port = process.env.PORT
const corsOptions = {
    origin: `http://localhost:${port}`
  };
app.use(cors(corsOptions));
app.use(express.json({limit: "50mb" }));
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

app.use(BASE_PATH+"/auth", authRoute)

app.use(BASE_PATH+"/company", companyRoute)
app.use(BASE_PATH+"/employee", employeeRoute)


app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
