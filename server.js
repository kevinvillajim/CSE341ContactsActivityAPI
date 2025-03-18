const express = require("express");
const app = express();
const contactRoutes = require("./src/routes/contactRoutes.js");
const swaggerRoutes = require("./src/routes/swagger.js");
const {connectToDb} = require("./src/config/database.js");
require("dotenv").config();

async function startServer() {
	await connectToDb();
	app.use(express.json());
	app.use((req, res, next) => {
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, 2-Key"
		);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		next();
	});

	app.use("/contacts", contactRoutes);
	app.use("/", swaggerRoutes);

	app.get("/", (req, res) => {
		res.redirect("/contacts");
	});

	const PORT = process.env.PORT || 8080;

	app.listen(PORT, () => {
		console.log(`Server running at port ${PORT}`);
		console.log(`API documentation: http://localhost:${PORT}/api-docs`);
		console.log(`API endpoints: http://localhost:${PORT}/contacts/`);
	});
}

startServer();
