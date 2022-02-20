module.exports = (sequelize, Sequelize) => {
    const UserModel = sequelize.define("Users", {
      Email: {
        type: Sequelize.STRING(30),
        validate : {
            isEmail: true
        },
        allowNull: false
      },
      Password: {
        type: Sequelize.STRING(100)
      }
    }
    );
   
    return UserModel;
  };
  