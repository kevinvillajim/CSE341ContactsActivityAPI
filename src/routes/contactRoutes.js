const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController.js");

router.get("/", contactController.getContacts);
router.get("/:_id", contactController.getContactById);
router.post("/", contactController.createContact);
router.get("/load-contacts/run", contactController.loadContactsCollection);
router.put("/:firstName/:lastName", contactController.updateContact);
router.delete("/delete-all", contactController.deleteAllContacts);
router.delete("/:_id", contactController.deleteContact);

module.exports = router;
