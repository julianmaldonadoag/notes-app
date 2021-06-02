const Note = require('../models/Note')
const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note')
}

notesCtrl.createNewNote = async (req, res) => {
  const { title, description } = req.body
  const note = { title, description }

  // Validation.
  const errors = []

  if (!title) errors.push({text: 'Empty title field'})
  if (!description) errors.push({text: 'Empty description field'})
  if (errors.length > 0) {
    return res.render('notes/new-note', {
      errors,
      note
    })
  } 

  const userId = req.user.id // Data from passport.
  const newNote = new Note({title, description, userId})
  await newNote.save()
  req.flash('success_msg', 'Note added successfully')

  res.redirect('/notes')
}

notesCtrl.renderNotes = async (req, res) => {
  const userId = req.user.id // Data from passport.
  const notes = await Note.find({userId}).lean().sort({createdAt: 'desc'})
  
  res.render('notes/all-notes', { notes })
}

notesCtrl.renderEditForm = async(req, res) => {
  const note = await Note.findById(req.params.id).lean()

  if (note.userId != req.user.id) {
    req.flash('error_msg', 'Unauthorized')
    return res.redirect('/notes')
  }

  res.render('notes/edit-note', { note })
}

notesCtrl.updateNote = async(req, res) => {
  const { title, description } = req.body
  
  // Validation.
  const errors = []
  const note = {
    _id: req.params.id,
    title,
    description
  }
  
  if (!title) errors.push({text: 'Empty title field'})
  if (!description) errors.push({text: 'Empty description field'})
  if (errors.length > 0) {
    return res.render('notes/edit-note', {
      errors,
      note
    })
  } 

  await Note.findByIdAndUpdate(req.params.id, { title, description })
  req.flash('success_msg', 'Note updated successfully')

  res.redirect('/notes')
}

notesCtrl.deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  req.flash('success_msg', 'Note deleted successfully')

  res.redirect('/notes')
}

module.exports = notesCtrl