const { Router } = require('express')
const { 
  renderNoteForm,
  createNewNote,
  renderNotes, 
  renderEditForm,
  updateNote,
  deleteNote } = require('../controllers/notes.controller')
const {isAuthenticated} = require('../helpers/auth')

const router = Router()

// Create note.
router.get('/add', isAuthenticated, renderNoteForm)
router.post('/add', isAuthenticated, createNewNote)

// Read all notes.
router.get('/', isAuthenticated, renderNotes)

// Update note.
router.get('/edit/:id', isAuthenticated, renderEditForm)
router.put('/edit/:id', isAuthenticated, updateNote)

// Delete note.
router.delete('/delete/:id', isAuthenticated, deleteNote)

module.exports = router
