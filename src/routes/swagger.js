const path = require("path");
const router = require("express").Router();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require(path.join(process.cwd(), "swagger.json"));

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = router;
