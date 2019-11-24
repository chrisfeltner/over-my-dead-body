const express = require('express');
const router = express.Router();

const noteController = require('../controllers/noteController');

// GET request for list of notes
router.get('/getNotes', noteController.getNotes);

// POST request for edit note
router.get('/setNote', noteController.editNote);

// POST request for create note
router.post('/createNote', noteController.createNote);

// DELETE request for delete note
router.get('/deleteNote', noteController.deleteNote);


module.exports = router;