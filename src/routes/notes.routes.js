const { Router } = require('express')
const { 
  renderNoteForm,
  createNewNote,
  renderNotes, 
  renderEditForm,
  updateNote,
  deleteNote } = require('../controllers/notes.controller')

const router = Router()

// Create note.
router.get('/add', renderNoteForm)
router.post('/add', createNewNote)

// Read all notes.
router.get('/', renderNotes)

// Update note.
router.get('/edit/:id', renderEditForm)
router.put('/edit/:id', updateNote)

// Delete note.
router.delete('/delete/:id', deleteNote)

module.exports = router
