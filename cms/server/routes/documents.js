
const SequenceGenerator = require('./sequenceGenerator');
const sequenceGenerator = new SequenceGenerator("documents");
const Document = require('../models/document');

var express = require('express');
var router = express.Router();
module.exports = router; 


router.get('/', (req, res, next) => {
    Document.find()
        .then(documents => {
            res.status(200).json(documents);
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

router.post('/', async (req, res, next) => {
    try {
        const maxDocumentId = await sequenceGenerator.nextId();

        const document = new Document({
            id: maxDocumentId,
            name: req.body.name,
            description: req.body.description,
            url: req.body.url
        });

        const createdDocument = await document.save();
        res.status(201).json({
            message: 'Document added successfully',
            document: createdDocument
        });
    } catch (error) {
        console.error("Error in POST /documents:", error);
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    }
});

  router.put('/:id', (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        document.name = req.body.name;
        document.description = req.body.description;
        document.url = req.body.url;
  
        Document.updateOne({ id: req.params.id }, document)
          .then(result => {
            res.status(204).json({
              message: 'Document updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });


  
router.delete("/:id", (req, res, next) => {
    Document.findOne({ id: req.params.id })
      .then(document => {
        Document.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Document deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Document not found.',
          error: { document: 'Document not found'}
        });
      });
  });