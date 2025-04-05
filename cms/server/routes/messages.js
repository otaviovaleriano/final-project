const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const sequenceGenerator = require('./sequenceGenerator');

// GET all messages
router.get('/', (req, res, next) => {
    Message.find()
        .populate('sender') 
        .then(messages => {
            res.status(200).json(messages);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// POST a new message
router.post('/', (req, res, next) => {
    const maxMessageId = sequenceGenerator.nextId("messages");

    const message = new Message({
        id: maxMessageId,
        subject: req.body.subject,
        msgText: req.body.msgText,
        sender: req.body.sender // This should be an ObjectId of a Contact
    });

    message.save()
        .then(createdMessage => {
            res.status(201).json({
                message: 'Message added successfully',
                messageData: createdMessage
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// PUT (Update) an existing message
router.put('/:id', (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    message: 'Message not found'
                });
            }

            message.subject = req.body.subject;
            message.msgText = req.body.msgText;
            message.sender = req.body.sender;

            return Message.updateOne({ id: req.params.id }, message);
        })
        .then(result => {
            res.status(204).json({
                message: 'Message updated successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

// DELETE a message
router.delete("/:id", (req, res, next) => {
    Message.findOne({ id: req.params.id })
        .then(message => {
            if (!message) {
                return res.status(404).json({
                    message: 'Message not found'
                });
            }

            return Message.deleteOne({ id: req.params.id });
        })
        .then(result => {
            res.status(204).json({
                message: "Message deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

module.exports = router;
