const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');

// GET request for list of notes
router.get('/getNotes', noteController.authenticate, noteController.getNotes);

// POST request for edit note
router.post('/setNote', noteController.authenticate, noteController.editNote);

// POST request for create note
router.post('/createNote', noteController.authenticate, noteController.createNote);

// DELETE request for delete note
router.delete('/deleteNote', noteController.authenticate, noteController.deleteNote);


module.exports = router;