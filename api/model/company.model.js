module.exports = (sequelize, Sequelize) => {
    const CompanyModel = sequelize.define("Companies", {
      Name: {
        type: Sequelize.STRING(50),
        primaryKey: true,
        allowNull : false
      },
      Email: {
        type: Sequelize.STRING(30),
        validate : {
            isEmail: true,
        }
      },
      Phone: {
        type: Sequelize.STRING(13)
      },
      Website: {
        type: Sequelize.STRING(30)
      }
    },
    );
   
    return CompanyModel;
  };
  