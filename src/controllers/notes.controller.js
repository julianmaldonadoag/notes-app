const Note = require('../models/Note')
const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body
  const newNote = Note({title, description})
  await newNote.save()

  res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
  const notes = await Note.find().lean()
  
  res.render('notes/all-notes', {notes})
}

notesCtrl.renderEditForm = (req, res) => {
  res.send(`Render edit form to note ${req.params.id}`)
}

notesCtrl.updateNote = (req, res) => {
  res.send(`Update note ${req.params.id}`)
}

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)

  res.redirect('/notes')
}

module.exports = notesCtrl