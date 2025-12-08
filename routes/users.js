let express = require("express");
let router = express.Router();
const UsersModel = require("../models/Users");
const bcrypt = require("bcrypt");

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
  const encryptedPassword = await bcrypt.hash(password, 10);

  const users = await UsersModel.create({
    nip,
    nama,
    password: encryptedPassword,
  });

  res.status(200).json({
    data: users,
    metadata: "test data user",
  });
});

router.put("/", async (req, res) => {
  //! me
  // const { nip, nama, password, newPassword } = req.body;
  // const userData = await UsersModel.findOne({ where: { nip } });
  // const userpasslama = userData.password;
  // const encryptedPasswordOld = await bcrypt.hash(userpasslama, 10);
  // const compare = await bcrypt.compare(encryptedPasswordOld, inputpass);
  // const inputpass = await bcrypt.hash(password, 10);
  // const encryptedPasswordNew = await bcrypt.hash(newPassword, 10);
  // res.json({ userpasslama });
  //! me

  //! ai

  const { nip, password, newPassword } = req.body;

  // 1. Cari user
  const userData = await UsersModel.findOne({ where: { nip } });
  if (!userData) return res.status(404).json({ message: "User tidak ditemui" });

  const hashDalamDB = userData.password; // hashed password lama

  // 2. Compare password lama (input) dengan hashed DB

  // res.json({ hashDalamDB });
  const betul = await bcrypt.compare(password, hashDalamDB);
  if (!betul) {
    return res.status(400).json({ message: "Password lama salah" });
  }

  // 3. Hash password baru
  const hashBaru = await bcrypt.hash(newPassword, 10);

  // 4. Update dalam DB
  await UsersModel.update({ password: hashBaru }, { where: { nip } });

  return res.json({ message: "Password berjaya ditukar" });

  //! ai

  // let users;
  // if (compare) {
  //   users = await UsersModel.update(
  //     {
  //       nama: nama,
  //       password: encryptedPassword,
  //     },
  //     {
  //       where: { nip: userData.nip },
  //     }
  //   );
  //   res.status(200).json({
  //     upadated: users[0],
  //     metadata: "update user",
  //   });
  // } else {
  //   res.status(400).json({
  //     error: "data invalid",
  //   });
  // }
  // res.status(200).json({
  //   data: users,
  //   metadata: "test data user",
  // });
});

// router.get("/bayar", (req, res) => {
//   res.status(200).json({
//     data: "lorem ipsum",
//     metadata: "test data user",
//   });
// });
// /bayar

module.exports = router;
