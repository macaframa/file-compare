const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/api", api);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
