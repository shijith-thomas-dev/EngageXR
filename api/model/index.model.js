const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const companies = require("./company.model")
const employees = require("./employee.model")
const users = require("./user.model")
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.companies = companies(sequelize, Sequelize);
db.employees = employees(sequelize, Sequelize);
db.users = users(sequelize, Sequelize);

db.companies.hasOne(db.employees, {
    foreignKey : 'CompanyName',
    onDelete : 'CASCADE',
    hooks: true
})
db.employees.belongsTo(db.companies)


module.exports = db;