const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');
const auth = require('../auth')

// GET request for list of notes
router.get('/getNotes', auth.authenticateWithExpiration, noteController.getNotes);

// POST request for edit note
router.post('/setNote', auth.authenticateWithExpiration, noteController.editNote);

// POST request for create note
router.post('/createNote', auth.authenticateWithExpiration, noteController.createNote);

// DELETE request for delete note
router.delete('/deleteNote', auth.authenticateWithExpiration, noteController.deleteNote);


module.exports = router;