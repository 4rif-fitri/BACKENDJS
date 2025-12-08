const express = require("express");
const router = express.Router();
const KehadiranModel = require("../models/Kehadiran");

router.get("/", async (req, res) => {
  const kehadiran = await KehadiranModel.findAll();

  res.status(200).json({
    data: kehadiran,
    metadata: "test kehadiran endpoint",
  });
});

router.post("/in", async (req, res) => {
  const { nip } = req.body;
  const kehadiran = await KehadiranModel.create({
    users_nip: nip,
    status: "in",
  });

  res.status(200).json({
    data: kehadiran,
    metadata: "Done in",
  });
});

router.post("/out", async (req, res) => {
  const { nip } = req.body;
  const kehadiran = await KehadiranModel.create({
    users_nip: nip,
    status: "out",
  });

  res.status(200).json({
    data: kehadiran,
    metadata: "Done out",
  });
});

module.exports = router;
