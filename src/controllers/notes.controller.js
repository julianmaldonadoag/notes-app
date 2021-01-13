const notesCtrl = {}

notesCtrl.renderNoteForm = (req, res) => {
  res.send('Render note form')
}

notesCtrl.createNewNote = (req, res) => {
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