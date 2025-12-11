# Notes Frontend

A modern, lightweight note-taking application built with React and Vite. Create, edit, and organize your notes with color-coded categories.

## Features

- **Create Notes** - Add new notes with title and content
- **Edit Notes** - Modify existing notes seamlessly
- **Delete Notes** - Remove notes with a single click
- **Color Coding** - Organize notes with 6 preset colors (white, yellow, green, blue, purple, orange)
- **Responsive Design** - Clean grid layout that adapts to your screen

## Tech Stack

- **React 19** - Modern UI with hooks
- **Vite** - Fast build tool with Hot Module Replacement
- **Lucide React** - Beautiful icon library
- **Pure CSS** - No framework dependencies

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd notes-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
notes-frontend/
├── src/
│   ├── components/
│   │   ├── NoteCard.jsx      # Individual note display
│   │   ├── NoteCard.css
│   │   ├── NoteForm.jsx      # Form for creating/editing notes
│   │   ├── NoteForm.css
│   │   ├── NoteList.jsx      # Grid container for notes
│   │   └── NoteList.css
│   ├── App.jsx               # Main application component
│   ├── App.css
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Usage

1. **Add a Note**: Fill in the title and content fields, select a color, and click "Add Note"
2. **Edit a Note**: Click the pencil icon on any note to load it into the form for editing
3. **Delete a Note**: Click the trash icon to remove a note
4. **Color Code**: Click on any color in the palette to categorize your note

## License

This project is private.
