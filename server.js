const express = require("express");
const app = express();
const contactRoutes = require("./src/routes/contactRoutes.js");
const { connectToDb } = require("./src/config/database.js");
require("dotenv").config();

async function startServer() {
  await connectToDb();
  app.use(express.json());
  app.use("/contacts", contactRoutes);

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT} \n http://localhost:${PORT}`);
  });
}

startServer();
