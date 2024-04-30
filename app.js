const express = require("express");
const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");
const router = require("./routes/routes");

const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://alvinabiero:<password>@cluster0.ktv58tn.mongodb.net/TODO"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use("/api/todo", router);
app.use("/api", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
