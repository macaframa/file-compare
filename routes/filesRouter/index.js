const router = require("express").Router();
const normalizeRows = require("../../utils/normalizeRows");

router.post("/normalize", (req, res) => {
  const { rows } = req.body;
  res.send(normalizeRows(rows));
});

module.exports = router;
