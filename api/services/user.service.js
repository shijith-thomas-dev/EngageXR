const db = require("../model/index.model");
const UserDB = db.users;

exports.createUser = async (data) => {
  let result = await UserDB.create(data)
  return result
};

exports.getUserByEmail = async (email) => {
    let result = await UserDB.findAll({
      where : {
        Email : email
        }
      })
    return result
  };