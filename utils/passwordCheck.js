const bcrypt = require("bcrypt");
const UsersModel = require("../models/Users");

const passwordCheck = async (nip, password) => {
  const userData = await UsersModel.findOne({
    where: {
      nip: nip,
    },
  });

  const compare = await bcrypt.compare(password, userData.password);
  //   return compare;
  return { compare, userData };
};
module.exports = passwordCheck;
