const { ObjectId } = require("mongodb");
const { getDB } = require("../config/database.js");
require("dotenv").config();
const collection = process.env.COLLECTION;
const data = require("../data/contacts.json");

//Get all the contacts in the DB

async function getContacts(req, res) {
  try {
    const db = getDB();
    const contacts = await db.collection(collection).find().toArray();
    res.json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Get a contact by id

async function getContactById(req, res) {
  try {
    const db = getDB();
    const contactId = ObjectId.createFromHexString(req.params._id);
    const contact = await db.collection(collection).findOne({ _id: contactId });

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Create a new contact in the DB

async function createContact(req, res) {
  try {
    const db = getDB();
    const { id, ...contactData } = req.body;
    const result = await db.collection(collection).insertOne(contactData);
    res.status(201).json({ id: result.insertedId, contactData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Load Contacts from File to MongoDB

async function loadContactsCollection(req, res) {
  try {
    const db = getDB();
    const preparedData = data.map(({ _id, ...item }) => item);
    const result = await db.collection(collection).insertMany(preparedData);
    res.status(201).json({
      insertedCount: result.insertedCount,
      insertedIds: result.insertedIds,
    });
    console.log("Data loaded");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Update a contact in the DB by name and last name

async function updateContact(req, res) {
  try {
    const db = getDB();
    const result = await db
      .collection(collection)
      .updateOne(
        { firstName: req.params.firstName, lastName: req.params.lastName },
        { $set: req.body }
      );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.status(200).json({ modifiedCount: result.modifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//delete a contact in the DB by ID

async function deleteContact(req, res) {
  try {
    const db = getDB();
    const contactId = ObjectId.createFromHexString(req.params._id);
    const result = await db
      .collection(collection)
      .deleteOne({ _id: contactId });
    res.status(200).json({ deletedCount: result.deletedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

//Delete all contacts in the DB

async function deleteAllContacts(req, res) {
  try {
    const db = getDB();
    const result = await db.collection(collection).deleteMany({});
    res.status(200).json({
      deletedCount: result.deletedCount,
      message: "All contacts deleted",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getContacts,
  getContactById,
  createContact,
  loadContactsCollection,
  updateContact,
  deleteContact,
  deleteAllContacts,
};
