let express = require("express");
let router = express.Router();
const UsersModel = require("../models/Users");

router.get("/", async (req, res) => {
  const users = await UsersModel.findAll();

  res.status(200).json({
    data: users,
    metadata: "test data user",
  });
});

router.post("/", async (req, res) => {
  // const nip = req.body.nip,
  //   nama = req.body.nama,
  //   password = req.body.password;

  const { nip, nama, password } = req.body;

  const users = await UsersModel.create({
    nip,
    nama,
    password,
  });

  res.status(200).json({
    data: users,
    metadata: "test data user",
  });
});

// router.get("/bayar", (req, res) => {
//   res.status(200).json({
//     data: "lorem ipsum",
//     metadata: "test data user",
//   });
// });
// /bayar

module.exports = router;
