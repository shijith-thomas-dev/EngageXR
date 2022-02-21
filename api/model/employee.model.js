module.exports = (sequelize, Sequelize) => {
  const EmployeeModel = sequelize.define("Employees", {
    EmployeeID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Firstname: {
      type: Sequelize.STRING(30),
      allowNull: false
    },
    Lastname: {
      type: Sequelize.STRING(30)
    },
    Email: {
      type: Sequelize.STRING(30),
      validate : {
          isEmail: true
      },
      unique: true
    },
    Phone: {
      type: Sequelize.STRING(13),
      unique: true
    },
    CompanyName: {
      type: Sequelize.STRING(50),
      allowNull: false
    }
  });

  return EmployeeModel;
};