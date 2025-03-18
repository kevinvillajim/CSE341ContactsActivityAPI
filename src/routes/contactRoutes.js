const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController.js");

router.get("/load-contacts/run", contactController.loadContactsCollection);
router.get("/", contactController.getContacts);
router.get("/:_id", contactController.getContactById);
router.post("/", contactController.createContact);
router.put("/:_id", contactController.updateContact);
router.delete("/:_id", contactController.deleteContact);
router.delete("/delete-all", contactController.deleteAllContacts);

module.exports = router;
