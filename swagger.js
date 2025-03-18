require("dotenv").config();
const swaggerAutogen = require("swagger-autogen")();

// const PORT = process.env.PORT || 8080;

const doc = {
	info: {
		title: "Contacts Api",
		description: "API for managing contacts",
	},
	host: "cse341contactsactivityapi.onrender.com",
	schemes: ["https", "http"],
	basePath: "/contacts",
	definitions: {
		Contact: {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			favoriteColor: "Blue",
			birthday: "1990-01-01",
		},
		ContactUpdate: {
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			favoriteColor: "Blue",
			birthday: "1990-01-01",
		},
	},
};


const outputFile = "./swagger.json";
const endpointsFiles = ["./src/routes/contactRoutes.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log("Swagger generated correctly.");
});
