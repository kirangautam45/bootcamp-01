# Notes App - Frontend

A React application built with Vite for creating, viewing, editing, and deleting notes.

---

## Table of Contents

- [Folder Structure](#folder-structure)
- [Dependencies Explained](#dependencies-explained)
- [File-by-File Code Explanation](#file-by-file-code-explanation)
  - [package.json](#1-packagejson)
  - [vite.config.js](#2-viteconfigjs)
  - [index.html](#3-indexhtml)
  - [main.jsx](#4-srcmainjsx)
  - [App.jsx](#5-srcappjsx)
  - [App.css](#6-srcappcss)
  - [NoteForm.jsx](#7-srccomponentsnoteformjsx)
  - [NoteForm.css](#8-srccomponentsnoteformcss)
  - [NoteList.jsx](#9-srccomponentsnotelistjsx)
  - [NoteList.css](#10-srccomponentsnotelistcss)
  - [NoteCard.jsx](#11-srccomponentsnotecardcss)
  - [NoteCard.css](#12-srccomponentsnotecardcss-1)
- [React Concepts Explained](#react-concepts-explained)
- [Data Flow](#data-flow)
- [Component Hierarchy](#component-hierarchy)

---

## Folder Structure

```
frontend/
├── public/               # Static assets
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx    # Single note display
│   │   ├── NoteCard.css
│   │   ├── NoteForm.jsx    # Create/edit form
│   │   ├── NoteForm.css
│   │   ├── NoteList.jsx    # Grid of notes
│   │   └── NoteList.css
│   ├── App.jsx             # Main component
│   ├── App.css
│   └── main.jsx            # React entry point
├── index.html              # HTML template
├── package.json
└── vite.config.js          # Vite configuration
```

---

## Dependencies Explained

| Package       | Purpose                                              |
|---------------|------------------------------------------------------|
| react         | Core React library for building UI components        |
| react-dom     | React renderer for web browsers                      |
| lucide-react  | Beautiful icon library for React                     |
| vite          | Fast build tool and development server               |

---

## File-by-File Code Explanation

### 1. `package.json`

```json
{
  "name": "frontend",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "lucide-react": "^0.556.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "vite": "^7.2.4"
  }
}
```

#### Key Parts Explained:

```json
"private": true,
```
- **What**: Prevents accidental npm publish
- **Why**: This is an app, not a package to share

```json
"type": "module",
```
- **What**: Enable ES Modules
- **Effect**: Can use `import/export` syntax

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "lint": "eslint .",
  "preview": "vite preview"
},
```
- **`npm run dev`**: Start development server with hot reload
- **`npm run build`**: Create production build in `dist/` folder
- **`npm run lint`**: Check code for errors and style issues
- **`npm run preview`**: Preview the production build locally

```json
"dependencies": {
  "lucide-react": "^0.556.0",
  "react": "^19.2.0",
  "react-dom": "^19.2.0"
},
```
- **`react`**: Core React library (components, hooks, state)
- **`react-dom`**: Connects React to browser DOM
- **`lucide-react`**: Modern icon library (Pencil, Trash2, Loader2 icons)

```json
"devDependencies": {
  "@vitejs/plugin-react": "^5.1.1",
  "vite": "^7.2.4",
  "eslint": "^9.39.1",
  ...
}
```
- **`vite`**: Build tool (like webpack but faster)
- **`@vitejs/plugin-react`**: Vite plugin for React support (JSX, Fast Refresh)
- **`eslint`**: Code linting tool
- **devDependencies**: Only needed during development, not in production

---

### 2. `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

#### Line-by-Line:

```javascript
import { defineConfig } from 'vite'
```
- **What**: Import Vite's config helper
- **Why**: Provides type hints and validation

```javascript
import react from '@vitejs/plugin-react'
```
- **What**: Import React plugin
- **Why**: Enables JSX transformation and Fast Refresh

```javascript
export default defineConfig({
  plugins: [react()],
})
```
- **`defineConfig({})`**: Creates Vite configuration
- **`plugins: [react()]`**: Register React plugin
  - Transforms JSX to JavaScript
  - Enables React Fast Refresh (instant updates without losing state)

---

### 3. `index.html`

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/notes.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Notes App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

#### Key Parts:

```html
<link rel="icon" type="image/svg+xml" href="/notes.svg" />
```
- **What**: Browser tab icon (favicon)
- **`/notes.svg`**: Custom notes icon for the app

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
- **What**: Makes the page responsive on mobile
- **`width=device-width`**: Match screen width
- **`initial-scale=1.0`**: No zoom by default

```html
<div id="root"></div>
```
- **What**: Empty container div
- **Why**: React will render the entire app inside this div
- **This is the "mount point"**: React takes over this element

```html
<script type="module" src="/src/main.jsx"></script>
```
- **What**: Load the React application
- **`type="module"`**: Use ES Modules (allows import/export)
- **`src="/src/main.jsx"`**: Entry point file
- **Why at bottom**: HTML loads top-to-bottom; div must exist before script runs

---

### 4. `src/main.jsx`

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

#### Line-by-Line:

```javascript
import { StrictMode } from 'react'
```
- **What**: Import StrictMode component
- **StrictMode**: Development helper that:
  - Warns about deprecated patterns
  - Detects side effects
  - Double-renders components to find bugs
  - Only active in development, removed in production

```javascript
import { createRoot } from 'react-dom/client'
```
- **What**: Import the root creation function
- **`react-dom/client`**: Client-side rendering API
- **`createRoot`**: Creates a React root for rendering (React 18+ API)

```javascript
import App from './App.jsx'
```
- **What**: Import the main App component
- **`App`**: The root component of our application
- **All other components**: Rendered inside App

```javascript
createRoot(document.getElementById('root'))
```
- **`document.getElementById('root')`**: Find the div in index.html
- **`createRoot()`**: Create a React root on that element
- **What this does**: React now controls this DOM element

```javascript
.render(
  <StrictMode>
    <App />
  </StrictMode>
)
```
- **`.render()`**: Render React elements to the DOM
- **`<StrictMode>`**: Wrapper for development checks
- **`<App />`**: Our main application component
- **What happens**: React converts JSX to DOM elements

---

### 5. `src/App.jsx`

This is the main component that orchestrates the entire application.

```javascript
import { useState, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
import './App.css'
```

#### Imports Explained:

```javascript
import { useState, useEffect } from 'react'
```
- **What**: Import React hooks
- **`useState`**: Create and manage state variables
- **`useEffect`**: Run code on component lifecycle events

```javascript
import { Loader2 } from 'lucide-react'
```
- **What**: Import loading spinner icon
- **`Loader2`**: Animated spinner component from lucide-react

```javascript
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'
```
- **What**: Import child components
- **Why separate files**: Organize code, reusability, maintainability

```javascript
import './App.css'
```
- **What**: Import component-specific styles
- **Effect**: Styles apply to this component

---

#### API Configuration:

```javascript
const API_URL = `${import.meta.env.VITE_API_URL}/notes`
```
- **What**: Base URL for backend API
- **`import.meta.env.VITE_API_URL`**: Environment variable from `.env` file
- **Why env variable**: Different URLs for development vs production
- **Example**: `http://localhost:5001/api/notes`

---

#### Component Function:

```javascript
function App() {
```
- **What**: Define the App component
- **Function component**: Simpler than class components
- **Convention**: Component names are PascalCase

---

#### State Variables:

```javascript
const [notes, setNotes] = useState([])
```
- **What**: Create state for notes array
- **`useState([])`**: Initial value is empty array
- **Returns array with 2 elements**:
  - `notes`: Current value (the array of notes)
  - `setNotes`: Function to update the value
- **When `setNotes` called**: Component re-renders with new value

```javascript
const [editingNote, setEditingNote] = useState(null)
```
- **What**: Track which note is being edited
- **`null`**: No note is being edited
- **When editing**: Contains the note object being edited

```javascript
const [loading, setLoading] = useState(true)
```
- **What**: Track loading state
- **`true`**: Initially loading (fetching data)
- **Why**: Show loading indicator to user

---

#### useEffect Hook:

```javascript
useEffect(() => {
  fetchNotes()
}, [])
```
- **What**: Run code when component mounts
- **`useEffect(callback, dependencies)`**:
  - First arg: Function to run
  - Second arg: Array of dependencies
- **Empty array `[]`**: Run only once, on mount
- **No array**: Run on every render
- **With values `[x]`**: Run when `x` changes

---

#### fetchNotes Function:

```javascript
const fetchNotes = async () => {
  try {
    const response = await fetch(API_URL)
    const data = await response.json()
    setNotes(data)
  } catch (error) {
    console.error('Error fetching notes:', error)
  } finally {
    setLoading(false)
  }
}
```

**Line-by-line breakdown:**

```javascript
const fetchNotes = async () => {
```
- **What**: Define async function to fetch notes
- **`async`**: Can use `await` inside

```javascript
const response = await fetch(API_URL)
```
- **`fetch(API_URL)`**: Make HTTP GET request
- **`await`**: Wait for response
- **`response`**: Response object (not the data yet)

```javascript
const data = await response.json()
```
- **`response.json()`**: Parse JSON body
- **Returns Promise**: Need to await
- **`data`**: Now contains array of notes

```javascript
setNotes(data)
```
- **What**: Update state with fetched notes
- **Effect**: Component re-renders, NoteList receives new data

```javascript
} catch (error) {
  console.error('Error fetching notes:', error)
} finally {
  setLoading(false)
}
```
- **`catch`**: Handle network/parsing errors
- **`finally`**: Runs regardless of success/failure
- **`setLoading(false)`**: Stop showing loading indicator

---

#### addNote Function:

```javascript
const addNote = async (note) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(note),
    })
    const newNote = await response.json()
    setNotes([newNote, ...notes])
  } catch (error) {
    console.error('Error adding note:', error)
  }
}
```

**Key parts:**

```javascript
const response = await fetch(API_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(note),
})
```
- **`fetch(URL, options)`**: Make request with options
- **`method: 'POST'`**: HTTP method for creating
- **`headers`**: Metadata about request
  - `'Content-Type': 'application/json'`: Tell server we're sending JSON
- **`body`**: Data to send
  - `JSON.stringify(note)`: Convert object to JSON string

```javascript
setNotes([newNote, ...notes])
```
- **What**: Add new note to state
- **`[newNote, ...notes]`**: Create new array with:
  - `newNote` first (newest at top)
  - `...notes` spread existing notes after
- **Why new array**: React detects change by reference
  - `notes.push(newNote)` wouldn't trigger re-render

---

#### updateNote Function:

```javascript
const updateNote = async (id, updatedNote) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedNote),
    })
    const data = await response.json()
    setNotes(notes.map((note) => (note._id === id ? data : note)))
    setEditingNote(null)
  } catch (error) {
    console.error('Error updating note:', error)
  }
}
```

**Key parts:**

```javascript
`${API_URL}/${id}`
```
- **Template literal**: URL with ID
- **Example**: `http://localhost:5001/api/notes/abc123`
- **`method: 'PUT'`**: HTTP method for updating

```javascript
setNotes(notes.map((note) => (note._id === id ? data : note)))
```
- **What**: Update the note in state array
- **`notes.map()`**: Create new array, transforming each item
- **Logic**: For each note:
  - If `note._id === id`: Replace with updated `data`
  - Otherwise: Keep original note
- **Result**: New array with one note replaced

```javascript
setEditingNote(null)
```
- **What**: Clear editing state
- **Effect**: Form switches back to "create" mode

---

#### deleteNote Function:

```javascript
const deleteNote = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
    setNotes(notes.filter((note) => note._id !== id))
  } catch (error) {
    console.error('Error deleting note:', error)
  }
}
```

**Key parts:**

```javascript
await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
```
- **`method: 'DELETE'`**: HTTP method for deletion
- **No body needed**: ID is in URL
- **No response parsing**: Just need to know it succeeded

```javascript
setNotes(notes.filter((note) => note._id !== id))
```
- **What**: Remove note from state
- **`notes.filter()`**: Create new array excluding deleted note
- **Logic**: Keep notes where `_id !== id` (all except deleted)

---

#### JSX Return:

```javascript
return (
  <div className='app'>
    <header className='header'>
      <h1>Notes App</h1>
    </header>
```
- **What**: JSX returned by component
- **`className`**: React uses `className` instead of `class`
  - `class` is reserved word in JavaScript
- **Semantic HTML**: `<header>` indicates header section

```javascript
    <main className='main'>
      <NoteForm
        key={editingNote?._id || 'new'}
        onSubmit={
          editingNote ? (note) => updateNote(editingNote._id, note) : addNote
        }
        editingNote={editingNote}
        onCancel={() => setEditingNote(null)}
      />
```

**NoteForm props explained:**

```javascript
key={editingNote?._id || 'new'}
```
- **What**: React key for component identity
- **`editingNote?._id`**: Optional chaining - get `_id` if `editingNote` exists
- **`|| 'new'`**: Fallback to 'new' if no editing note
- **Why**: Forces React to recreate component when switching modes

```javascript
onSubmit={
  editingNote ? (note) => updateNote(editingNote._id, note) : addNote
}
```
- **Ternary operator**: `condition ? valueIfTrue : valueIfFalse`
- **If `editingNote` exists**: Pass function that calls `updateNote`
- **If `editingNote` is null**: Pass `addNote` function directly
- **Effect**: Form submits to different handlers based on mode

```javascript
editingNote={editingNote}
```
- **What**: Pass the note being edited (or null)
- **NoteForm uses this**: To pre-fill form fields

```javascript
onCancel={() => setEditingNote(null)}
```
- **What**: Function to cancel editing
- **Arrow function**: Creates new function that calls `setEditingNote(null)`
- **When called**: Clears editing state, form resets

---

#### Conditional Rendering:

```javascript
      {loading ? (
        <div className='loading'>
          <Loader2 className='animate-spin' size={32} />
        </div>
      ) : (
        <NoteList
          notes={notes}
          onEdit={setEditingNote}
          onDelete={deleteNote}
        />
      )}
```
- **`{loading ? (...) : (...)}`**: JSX ternary
- **If `loading` true**: Show spinning loader icon
- **If `loading` false**: Show NoteList

**Loader2 component:**
- **`className='animate-spin'`**: CSS class for rotation animation
- **`size={32}`**: Icon size in pixels

**NoteList props:**
- **`notes={notes}`**: Pass notes array
- **`onEdit={setEditingNote}`**: Pass state setter directly
  - When called with note: `setEditingNote(note)`
- **`onDelete={deleteNote}`**: Pass delete function

---

#### Footer:

```javascript
      <footer className='footer'>
        <p>3 Days MERN Stack Workshop</p>
      </footer>
    </main>
  </div>
)
```
- **`<footer>`**: Semantic HTML for page footer
- **Workshop attribution**: Displayed at bottom of page

```javascript
export default App
```
- **What**: Make App available for import
- **`default`**: Main export from this file
- **Import style**: `import App from './App'`

---

### 6. `src/App.css`

```css
* {
  box-sizing: border-box;
}
```
- **`*`**: Universal selector (all elements)
- **`box-sizing: border-box`**: Width includes padding and border
  - Default `content-box`: `width: 100px` + `padding: 10px` = 120px total
  - `border-box`: `width: 100px` = 100px total (padding inside)
- **Why**: Makes layouts more predictable

```css
body {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}
```
- **`margin: 0`**: Remove browser default margin
- **`font-family`**: Font stack - tries each font until one works
- **`background: linear-gradient(...)`**: Gradient background
  - `135deg`: Angle (diagonal top-left to bottom-right)
  - `#667eea 0%`: Blue-purple at start
  - `#764ba2 100%`: Purple at end
- **`min-height: 100vh`**: At least full viewport height

```css
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```
- **`display: flex`**: Use flexbox layout
- **`flex-direction: column`**: Stack children vertically
- **Why**: Allows footer to stick to bottom

```css
.header {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  padding: 24px 0;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
```
- **`rgba(255, 255, 255, 0.1)`**: 10% white (translucent)
- **`backdrop-filter: blur(10px)`**: Blur content behind (glass effect)
- **`border-bottom`**: Subtle white line

```css
.header h1 {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
```
- **`font-weight: 700`**: Bold text
- **`letter-spacing: -0.5px`**: Slightly tighter letters
- **`text-shadow`**: Subtle shadow below text

```css
.main {
  max-width: 1200px;
  width: 90%;
  margin: 0 auto;
  padding: 40px 20px;
  flex: 1;
}
```
- **`max-width: 1200px`**: Don't stretch beyond 1200px
- **`width: 90%`**: 90% of parent width
- **`margin: 0 auto`**: Center horizontally
- **`flex: 1`**: Grow to fill available space

```css
.loading {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```
- **Glass morphism style**: Translucent background with blur

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
```
- **`@keyframes spin`**: Define rotation animation
- **`from` to `to`**: Start at 0 degrees, end at 360 degrees
- **`animation: spin 1s linear infinite`**:
  - `spin`: Animation name
  - `1s`: Duration
  - `linear`: Constant speed
  - `infinite`: Loop forever

```css
.footer {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
```
- **`margin-top: auto`**: Push to bottom (flexbox trick)

---

### 7. `src/components/NoteForm.jsx`

```javascript
import { useState } from 'react'
import './NoteForm.css'

// Color palette for notes
const COLORS = [
  '#ffffff',  // White
  '#fff9c4',  // Light Yellow
  '#c8e6c9',  // Light Green
  '#bbdefb',  // Light Blue
  '#d1c4e9',  // Light Purple
  '#ffccbc',  // Light Orange
]
```
- **`COLORS` array**: Available color options for notes
- **Hex codes**: Each represents a pastel color

```javascript
function NoteForm({ onSubmit, editingNote, onCancel }) {
```
- **Destructured props**:
  - `onSubmit`: Function to call when form submits
  - `editingNote`: Note being edited (or null)
  - `onCancel`: Function to cancel editing

```javascript
const [title, setTitle] = useState(editingNote?.title || '')
const [content, setContent] = useState(editingNote?.content || '')
const [color, setColor] = useState(editingNote?.color || '#ffffff')
```
- **Initialize state from `editingNote`**
- **`editingNote?.title`**: Optional chaining - get title if editingNote exists
- **`|| ''`**: Default to empty string if undefined
- **Why this approach**: When component receives `key` prop, it remounts with new initial values

---

#### handleSubmit Function:

```javascript
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
```

**Line-by-line:**

```javascript
e.preventDefault()
```
- **`e`**: Event object
- **Purpose**: Stop default form submission
  - Default: Browser sends data to server, page reloads
  - We want: JavaScript handles it, no reload

```javascript
if (!title.trim() || !content.trim()) return
```
- **Validation**: Don't submit if fields are empty
- **`.trim()`**: Remove whitespace
- **`!title.trim()`**: True if empty or only spaces
- **`return`**: Stop function, don't submit

```javascript
onSubmit({ title, content, color })
```
- **What**: Call parent's onSubmit function
- **`{ title, content, color }`**: Object shorthand
  - Same as `{ title: title, content: content, color: color }`

```javascript
if (!editingNote) {
  setTitle('')
  setContent('')
  setColor('#ffffff')
}
```
- **Clear form after submit**: Only if creating new note
- **If editing**: Parent will remount component with new key

---

#### Form JSX:

```javascript
return (
  <form
    className='note-form'
    onSubmit={handleSubmit}
    style={{ backgroundColor: color }}
  >
```
- **`onSubmit={handleSubmit}`**: Handle form submission
- **`style={{ backgroundColor: color }}`**: Inline style
  - Outer `{}`: JSX expression
  - Inner `{}`: CSS object
  - Dynamic color: Form background matches selected color

```javascript
    <input
      type='text'
      placeholder='Title'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className='note-input'
    />
```
- **Controlled input**: React controls the value
- **`value={title}`**: Display current state
- **`onChange`**: Update state when user types
  - `e.target.value`: What user typed
  - `setTitle(...)`: Update state
  - Component re-renders with new value
- **Why controlled**: Single source of truth, easy validation

```javascript
    <textarea
      placeholder='Write your note...'
      value={content}
      onChange={(e) => setContent(e.target.value)}
      className='note-textarea'
      rows='4'
    />
```
- **Similar to input**: Controlled textarea
- **`rows='4'`**: Initial height (4 lines)

---

#### Color Picker:

```javascript
    <div className='color-picker'>
      {COLORS.map((c) => (
        <button
          key={c}
          type='button'
          className={`color-btn ${color === c ? 'selected' : ''}`}
          style={{ backgroundColor: c }}
          onClick={() => setColor(c)}
        />
      ))}
    </div>
```
- **`COLORS.map()`**: Render button for each color
- **`key={c}`**: Unique identifier (required for lists)
- **`type='button'`**: Prevent form submission on click
  - Default button type in form is "submit"
- **`className={...}`**: Dynamic class with template literal
  - If selected: `"color-btn selected"`
  - If not: `"color-btn "`
- **`onClick={() => setColor(c)}`**: Set color when clicked

---

#### Action Buttons:

```javascript
    <div className='form-actions'>
      {editingNote && (
        <button type='button' onClick={onCancel} className='btn btn-cancel'>
          Cancel
        </button>
      )}
      <button type='submit' className='btn btn-submit'>
        {editingNote ? 'Update' : 'Add Note'}
      </button>
    </div>
```
- **`{editingNote && (...)}`**: Conditional rendering
  - If `editingNote` is truthy: Render Cancel button
  - If null/undefined: Render nothing
- **`type='submit'`**: Triggers form onSubmit
- **Dynamic text**: "Update" when editing, "Add Note" when creating

```javascript
export default NoteForm
```

---

### 8. `src/components/NoteForm.css`

```css
.note-form {
  padding: 28px;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  margin-bottom: 40px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  transition: background-color 0.3s;
}
```
- **`border-radius: 16px`**: Rounded corners
- **`box-shadow`**: Large, soft shadow for depth
- **`backdrop-filter: blur(10px)`**: Glassmorphism effect
- **`transition: background-color 0.3s`**: Smooth color change

```css
.note-input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-bottom: 2px solid #e0e0e0;
  font-size: 20px;
  font-weight: 600;
  background: transparent;
  margin-bottom: 12px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}
```
- **`border-bottom`**: Only bottom border (underline style)
- **`background: transparent`**: Show form's color through input
- **`transition`**: Smooth border color change

```css
.note-input:focus {
  outline: none;
  border-bottom-color: #667eea;
}
```
- **`:focus`**: When user clicks into input
- **`outline: none`**: Remove default browser outline
- **`border-bottom-color: #667eea`**: Purple accent on focus

```css
.color-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 3px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.color-btn:hover {
  transform: scale(1.15);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.color-btn.selected {
  border-color: #667eea;
  transform: scale(1.15);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
}
```
- **`border-radius: 50%`**: Perfect circle
- **`transform: scale(1.15)`**: Grow 15% on hover/select
- **Selected state**: Purple border with glow effect

```css
.btn-submit {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}
```
- **Gradient background**: Matches app theme
- **Hover effect**: Lifts up (`translateY(-2px)`) with stronger shadow

---

### 9. `src/components/NoteList.jsx`

```javascript
import NoteCard from './NoteCard';
import './NoteList.css';

function NoteList({ notes, onEdit, onDelete }) {
```
- **Props**:
  - `notes`: Array of note objects
  - `onEdit`: Function to start editing
  - `onDelete`: Function to delete

```javascript
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes yet. Create your first note!</p>
      </div>
    );
  }
```
- **What**: Early return for empty state
- **Why**: Better UX than showing empty grid
- **When**: No notes exist yet

```javascript
  return (
    <div className="note-list">
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default NoteList;
```
- **`notes.map()`**: Render NoteCard for each note
- **`key={note._id}`**: MongoDB's unique ID as key
  - React uses keys to track items in lists
  - Enables efficient updates (only re-render changed items)
- **Pass props down**: note data and callback functions

---

### 10. `src/components/NoteList.css`

```css
.note-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
}
```
- **CSS Grid**: Modern layout system
- **`repeat(auto-fill, minmax(320px, 1fr))`**:
  - `auto-fill`: Create as many columns as fit
  - `minmax(320px, 1fr)`: Each column min 320px, max equal share
- **Effect**: Responsive grid, cards wrap automatically
- **`gap: 28px`**: Space between cards

```css
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.empty-state::before {
  content: '';
  display: block;
  font-size: 48px;
  margin-bottom: 16px;
}
```
- **`::before` pseudo-element**: Add emoji before text
- **`content: ''`**: The note emoji displayed

---

### 11. `src/components/NoteCard.jsx`

```javascript
import { Pencil, Trash2 } from 'lucide-react';
import './NoteCard.css';
```
- **`Pencil, Trash2`**: Icon components from lucide-react
- **Why lucide**: Clean, consistent icons as React components

```javascript
function NoteCard({ note, onEdit, onDelete }) {
```
- **Props**:
  - `note`: The note object to display
  - `onEdit`: Callback when edit clicked
  - `onDelete`: Callback when delete clicked

---

#### formatDate Function:

```javascript
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
```
- **What**: Format ISO date to readable string
- **Input**: `"2024-01-15T10:30:00.000Z"`
- **Output**: `"Jan 15, 2024"`
- **`toLocaleDateString`**: Browser's date formatting
- **Options**: Customize format (short month, numeric day/year)

---

#### Card JSX:

```javascript
return (
  <section
    className="note-card"
    style={{ backgroundColor: note.color || '#ffffff' }}
  >
    <h3 className="note-title">{note.title}</h3>
    <p className="note-content">{note.content}</p>
```
- **`<section>`**: Semantic HTML for content section
- **Inline style**: Dynamic background color
- **Fallback**: White if color undefined

```javascript
    <div className="note-footer">
      <span className="note-date">{formatDate(note.createdAt)}</span>
      <div className="note-actions">
```
- **Footer**: Date and action buttons
- **`formatDate(note.createdAt)`**: Call function with date string

```javascript
        <button
          onClick={() => onEdit(note)}
          className="action-btn edit-btn"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
```
- **Edit button**
- **`onClick={() => onEdit(note)}`**: Pass entire note object to parent
- **`<Pencil size={18} />`**: Pencil icon, 18px size
- **`title="Edit"`**: Tooltip on hover

```javascript
        <button
          onClick={() => onDelete(note._id)}
          className="action-btn delete-btn"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
```
- **Delete button**
- **`onDelete(note._id)`**: Pass only the ID (that's all delete needs)
- **`<Trash2 size={18} />`**: Trash icon

```javascript
      </div>
    </div>
  </section>
);

export default NoteCard;
```

---

### 12. `src/components/NoteCard.css`

```css
.note-card {
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
```
- **`display: flex; flex-direction: column`**: Stack content vertically
- **`min-height: 280px`**: Minimum card height for consistency
- **`position: relative`**: For positioning the `::before` pseudo-element
- **`overflow: hidden`**: Clip the accent bar

```css
.note-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.note-card:hover::before {
  opacity: 1;
}
```
- **`::before`**: Accent bar at top
- **`opacity: 0`**: Hidden by default
- **`opacity: 1` on hover**: Show gradient bar when hovering

```css
.note-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
}
```
- **Hover effect**: Card lifts up 8px
- **Stronger shadow**: Creates "floating" effect

```css
.note-title {
  margin: 0 0 16px 0;
  font-size: 22px;
  font-weight: 700;
  color: #2d3748;
  word-break: break-word;
  letter-spacing: -0.3px;
  line-height: 1.3;
}
```
- **`word-break: break-word`**: Long words wrap instead of overflow

```css
.note-content {
  margin: 0 0 20px 0;
  font-size: 15px;
  color: #4a5568;
  line-height: 1.7;
  word-break: break-word;
  white-space: pre-wrap;
  flex: 1;
}
```
- **`white-space: pre-wrap`**: Preserve line breaks from textarea
- **`flex: 1`**: Grow to fill available space (pushes footer down)

```css
.action-btn {
  background: rgba(0, 0, 0, 0.06);
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  color: #4a5568;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: rgba(0, 0, 0, 0.1);
  transform: scale(1.1);
}

.edit-btn:hover {
  background: rgba(102, 126, 234, 0.15);
  color: #667eea;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.15);
  color: #ef4444;
}
```
- **Subtle default background**: Light gray
- **Edit hover**: Purple tint (matches theme)
- **Delete hover**: Red tint (indicates danger)

---

## React Concepts Explained

### 1. Components

Components are reusable pieces of UI:

```javascript
// Function Component (modern, recommended)
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Usage
<Greeting name="Kiran" />
```

### 2. Props (Properties)

Props pass data from parent to child:

```javascript
// Parent
<NoteCard note={noteData} onDelete={handleDelete} />

// Child receives props
function NoteCard({ note, onDelete }) {
  // Use props
}
```

### 3. State (useState)

State is data that changes over time:

```javascript
const [count, setCount] = useState(0);

// Read: count
// Update: setCount(newValue)
// Updates trigger re-render
```

### 4. Effects (useEffect)

Run code at specific times:

```javascript
// On mount only
useEffect(() => {
  fetchData();
}, []);

// When dependency changes
useEffect(() => {
  console.log('Name changed:', name);
}, [name]);

// On every render (rarely needed)
useEffect(() => {
  console.log('Rendered');
});
```

### 5. Conditional Rendering

Show different content based on conditions:

```javascript
// Ternary
{isLoggedIn ? <Dashboard /> : <Login />}

// Logical AND (show if true)
{error && <ErrorMessage />}

// Early return
if (loading) return <Spinner />;
return <Content />;
```

### 6. Lists and Keys

Render arrays of data:

```javascript
{items.map((item) => (
  <Item key={item.id} data={item} />
))}
```
- **Key**: Unique identifier for each item
- **Why**: React tracks items, optimizes updates

### 7. Controlled Components

React controls form inputs:

```javascript
const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```
- **Uncontrolled**: DOM manages value
- **Controlled**: React manages value (recommended)

---

## Data Flow

```
+---------------------------------------------------------------------------+
|                              App.jsx                                       |
|                                                                            |
|   State: notes[], editingNote, loading                                     |
|   Functions: fetchNotes, addNote, updateNote, deleteNote                   |
|                                                                            |
|   +--------------------------------------------------------------------+   |
|   |                                                                    |   |
|   |    Props Down                              Events Up               |   |
|   |         |                                      |                   |   |
|   |         v                                      |                   |   |
|   |  +-------------+                               |                   |   |
|   |  |  NoteForm   |-------------------------------+                   |   |
|   |  |             |  onSubmit(note)                                   |   |
|   |  | editingNote |  onCancel()                                       |   |
|   |  +-------------+                                                   |   |
|   |                                                                    |   |
|   |         |                                      |                   |   |
|   |         v                                      |                   |   |
|   |  +-------------+                               |                   |   |
|   |  |  NoteList   |                               |                   |   |
|   |  |             |                               |                   |   |
|   |  |   notes[]   |                               |                   |   |
|   |  +-------------+                               |                   |   |
|   |         |                                      |                   |   |
|   |         v                                      |                   |   |
|   |  +-------------+                               |                   |   |
|   |  |  NoteCard   |-------------------------------+                   |   |
|   |  |             |  onEdit(note)                                     |   |
|   |  |    note     |  onDelete(id)                                     |   |
|   |  +-------------+                                                   |   |
|   |                                                                    |   |
|   +--------------------------------------------------------------------+   |
|                                                                            |
+---------------------------------------------------------------------------+
```

**Data flows DOWN through props**
**Events flow UP through callbacks**

---

## Component Hierarchy

```
App
|
+-- Header (h1)
|
+-- NoteForm
|   +-- Title Input
|   +-- Content Textarea
|   +-- Color Picker (6 buttons)
|   +-- Cancel Button (conditional)
|   +-- Submit Button
|
+-- Loading Spinner (conditional)
|
+-- NoteList
|   +-- Empty State (if no notes)
|   |
|   +-- NoteCard (for each note)
|       +-- Title (h3)
|       +-- Content (p)
|       +-- Date (span)
|       +-- Edit Button (Pencil icon)
|       +-- Delete Button (Trash2 icon)
|
+-- Footer
```

---

## Lifecycle of a Note

### Creating a Note:

1. User fills form, clicks "Add Note"
2. `NoteForm.handleSubmit` called
3. `e.preventDefault()` stops page reload
4. Validation: check if title and content have text
5. `onSubmit` prop called (which is `App.addNote`)
6. `addNote` sends POST request to backend
7. Backend creates note, returns with `_id`
8. `setNotes([newNote, ...notes])` updates state
9. React re-renders, NoteList receives new array
10. New NoteCard appears in grid

### Editing a Note:

1. User clicks Pencil icon on NoteCard
2. `onEdit(note)` called → `setEditingNote(note)`
3. App re-renders with `editingNote` set
4. NoteForm gets new `key` prop, remounts
5. useState initializes with `editingNote` values
6. Submit button shows "Update", Cancel button appears
7. User edits, clicks "Update"
8. `onSubmit` calls `updateNote(editingNote._id, note)`
9. PUT request to backend
10. `setNotes` with mapped array (replace edited note)
11. `setEditingNote(null)` clears editing state
12. NoteForm remounts with empty values

### Deleting a Note:

1. User clicks Trash2 icon
2. `onDelete(note._id)` called
3. DELETE request to backend
4. `setNotes(notes.filter(...))` removes from state
5. React re-renders, NoteCard disappears

---

## Quick Reference

| Hook | Purpose | Example |
|------|---------|---------|
| `useState` | Manage state | `const [x, setX] = useState(initial)` |
| `useEffect` | Side effects | `useEffect(() => {...}, [deps])` |

| Pattern | When to Use |
|---------|-------------|
| `condition && <Component />` | Show only if true |
| `condition ? <A /> : <B />` | Show one or the other |
| `array.map(item => <Item />)` | Render list |
| `() => handler(arg)` | Pass argument to handler |

| Array Method | Purpose | Mutates? |
|--------------|---------|----------|
| `.map()` | Transform each item | No (returns new array) |
| `.filter()` | Remove items | No (returns new array) |
| `.push()` | Add item | Yes (don't use with state!) |

---

## Environment Variables

Create a `.env` file in the frontend folder:

```
VITE_API_URL=http://localhost:5001/api
```

- **`VITE_` prefix**: Required for Vite to expose to client code
- **Access in code**: `import.meta.env.VITE_API_URL`
- **Production**: Change to deployed backend URL
