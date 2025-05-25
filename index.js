const express = require("express");
const cors = require("cors");

const otherRoutes = require("./routes/otherRoutes");
const getRoutes = require("./routes/getRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/other", otherRoutes);
app.use("/anime", getRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});