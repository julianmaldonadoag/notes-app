const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res) => {
  res.render('notes/new-note')
}

notesCtrl.createNewNote = (req, res) => {
  console.log(req.body)
  res.send('Creting new note')
}

notesCtrl.renderNotes = (req, res) => {
  res.send('Render notes')
}

notesCtrl.renderEditForm = (req, res) => {
  res.send(`Render edit form to note ${req.params.id}`)
}

notesCtrl.updateNote = (req, res) => {
  res.send(`Update note ${req.params.id}`)
}

notesCtrl.deleteNote = (req, res) => {
  res.send(`Delete note ${req.params.id}`)
}

module.exports = notesCtrl