const SequenceGenerator = require('./sequenceGenerator');
const sequenceGenerator = new SequenceGenerator("documents");
const Contact = require('../models/contact');

var express = require('express');
var router = express.Router();
module.exports = router; 

// GET all contacts (Populates the group property)
router.get("/", (req, res, next) => {
  Contact.find()
    .populate("group")
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

// POST a new contact
router.post("/", async (req, res, next) => {
  try {
    const maxContactId = await sequenceGenerator.nextId("contacts"); // Ensure sequenceGenerator is async

    const contact = new Contact({
      id: maxContactId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      imageUrl: req.body.imageUrl,
      group: req.body.group || [],
    });

    const createdContact = await contact.save();
    res.status(201).json({
      message: "Contact added successfully",
      contact: createdContact,
    });
  } catch (error) {
    console.error("Error in POST /contacts:", error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

// PUT (Update) an existing contact
router.put("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id }).exec();

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    // Update contact properties
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group || [];

    // Save the updated contact
    await Contact.updateOne({ id: req.params.id }, contact);

    res.status(204).json({
      message: "Contact updated successfully",
    });
  } catch (error) {
    console.error("Error in PUT /contacts/:id:", error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

// DELETE a contact
router.delete("/:id", async (req, res, next) => {
  try {
    const contact = await Contact.findOne({ id: req.params.id }).exec();

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    await Contact.deleteOne({ id: req.params.id });

    res.status(204).json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error in DELETE /contacts/:id:", error);
    res.status(500).json({
      message: "An error occurred",
      error: error,
    });
  }
});

module.exports = router;
