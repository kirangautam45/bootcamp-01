import { useState } from 'react'
import './NoteForm.css'

const COLORS = ['#ffffff', '#fff9c4', '#c8e6c9', '#bbdefb', '#d1c4e9', '#ffccbc']

function NoteForm({ onSubmit, editingNote, onCancel }) {
  const [title, setTitle] = useState(editingNote?.title || '')
  const [content, setContent] = useState(editingNote?.content || '')
  const [color, setColor] = useState(editingNote?.color || '#ffffff')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !content.trim()) return

    onSubmit({ title, content, color })

    if (!editingNote) {
      setTitle('')
      setContent('')
      setColor('#ffffff')
    }
  }

  return (
    <form
      className="note-form"
      onSubmit={handleSubmit}
      style={{ backgroundColor: color }}
    >
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="note-input"
      />
      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="note-textarea"
        rows="4"
      />
      <div className="color-picker">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            className={`color-btn ${color === c ? 'selected' : ''}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
      <div className="form-actions">
        {editingNote && (
          <button type="button" onClick={onCancel} className="btn btn-cancel">
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-submit">
          {editingNote ? 'Update' : 'Add Note'}
        </button>
      </div>
    </form>
  )
}

export default NoteForm
