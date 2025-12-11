# Notes App - MERN Stack

A full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js).

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Understanding the Code](#understanding-the-code)
  - [Backend Architecture](#backend-architecture)
  - [Frontend Architecture](#frontend-architecture)
- [Key Concepts Explained](#key-concepts-explained)

---

## Project Overview

This application allows users to:
- Create notes with a title, content, and color
- View all notes in a responsive grid layout
- Edit existing notes
- Delete notes
- Color-code notes for better organization

---

## Tech Stack

| Layer      | Technology | Purpose                          |
|------------|------------|----------------------------------|
| Frontend   | React      | User interface                   |
| Frontend   | Vite       | Build tool and dev server        |
| Backend    | Node.js    | JavaScript runtime               |
| Backend    | Express    | Web framework for REST API       |
| Database   | MongoDB    | NoSQL database for storing notes |
| Database   | Mongoose   | MongoDB object modeling (ODM)    |

---

## Project Structure

```
notes-app/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Note.js           # MongoDB schema definition
│   │   ├── routes/
│   │   │   └── noteRoutes.js     # API route handlers
│   │   └── server.js             # Express server entry point
│   ├── .env                      # Environment variables
│   ├── package.json              # Backend dependencies
│   └── package-lock.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── NoteCard.jsx      # Individual note display
    │   │   ├── NoteCard.css
    │   │   ├── NoteForm.jsx      # Form for creating/editing notes
    │   │   ├── NoteForm.css
    │   │   ├── NoteList.jsx      # Grid of all notes
    │   │   └── NoteList.css
    │   ├── App.jsx               # Main application component
    │   ├── App.css               # Main styles
    │   ├── main.jsx              # React entry point
    │   └── index.css             # Global styles
    ├── package.json              # Frontend dependencies
    └── vite.config.js            # Vite configuration
```

---

## Prerequisites

Before running this project, make sure you have installed:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

To verify installation:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
mongod --version  # Should show MongoDB version
```

---

## Installation

### 1. Clone or navigate to the project
```bash
cd notes-app
```

### 2. Install backend dependencies
```bash
cd backend
npm install
```

### 3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

### 4. Configure environment variables

The `.env` file in `backend/` contains:
```env
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5001
```

- `MONGODB_URI`: Connection string to MongoDB database
- `PORT`: Port number for the backend server

---

## Running the Application

You need **three terminal windows**:

### Terminal 1: Start MongoDB
```bash
mongod
```
Or if MongoDB is running as a service, skip this step.

### Terminal 2: Start Backend Server
```bash
cd notes-app/backend
npm run dev
```
You should see:
```
Server running on port 5001
Connected to MongoDB
```

### Terminal 3: Start Frontend Dev Server
```bash
cd notes-app/frontend
npm run dev
```
You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Open the app
Navigate to `http://localhost:5173` in your browser.

---

## API Endpoints

The backend provides a RESTful API:

| Method | Endpoint          | Description        | Request Body                              |
|--------|-------------------|--------------------|-------------------------------------------|
| GET    | `/api/notes`      | Get all notes      | -                                         |
| GET    | `/api/notes/:id`  | Get single note    | -                                         |
| POST   | `/api/notes`      | Create a new note  | `{ title, content, color }`               |
| PUT    | `/api/notes/:id`  | Update a note      | `{ title, content, color }` (any field)   |
| DELETE | `/api/notes/:id`  | Delete a note      | -                                         |

### Example API Requests (using curl)

**Create a note:**
```bash
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "My Note", "content": "Hello World", "color": "#ffeb3b"}'
```

**Get all notes:**
```bash
curl http://localhost:5001/api/notes
```

**Update a note:**
```bash
curl -X PUT http://localhost:5001/api/notes/NOTE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'
```

**Delete a note:**
```bash
curl -X DELETE http://localhost:5001/api/notes/NOTE_ID_HERE
```

---

## Understanding the Code

### Backend Architecture

#### 1. Entry Point (`src/server.js`)

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
```

**Key imports explained:**
- `express`: Web framework for creating the API server
- `mongoose`: ODM (Object Document Mapper) for MongoDB
- `cors`: Middleware to allow cross-origin requests (frontend → backend)
- `dotenv`: Loads environment variables from `.env` file

**ES Modules path resolution:**
```javascript
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });
```

In ES Modules (using `import`), `__dirname` doesn't exist by default. We recreate it to locate the `.env` file in the parent directory.

#### 2. Database Model (`src/models/Note.js`)

```javascript
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#ffffff'
  }
}, {
  timestamps: true  // Adds createdAt and updatedAt automatically
});
```

**Schema explained:**
- Defines the structure of documents in MongoDB
- `required: true` - Field must be provided
- `trim: true` - Removes whitespace from beginning/end
- `default` - Value used if not provided
- `timestamps: true` - Mongoose automatically adds `createdAt` and `updatedAt`

#### 3. Routes (`src/routes/noteRoutes.js`)

Routes handle HTTP requests and return responses:

```javascript
// GET all notes
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.json(notes);
});

// POST create note
router.post('/', async (req, res) => {
  const note = new Note({
    title: req.body.title,
    content: req.body.content,
    color: req.body.color
  });
  const newNote = await note.save();
  res.status(201).json(newNote);
});
```

**Key concepts:**
- `async/await` - Handle asynchronous database operations
- `req.body` - Contains data sent from client
- `req.params.id` - Contains URL parameters (e.g., `/notes/:id`)
- `res.json()` - Send JSON response
- `res.status()` - Set HTTP status code

---

### Frontend Architecture

#### 1. Main App Component (`src/App.jsx`)

```javascript
const API_URL = 'http://localhost:5001/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
```

**React Hooks used:**
- `useState` - Manage component state
- `useEffect` - Run code on component mount/update

#### 2. Fetching Data

```javascript
useEffect(() => {
  fetchNotes();
}, []);

const fetchNotes = async () => {
  const response = await fetch(API_URL);
  const data = await response.json();
  setNotes(data);
};
```

- `useEffect` with empty `[]` runs once when component mounts
- `fetch()` - Browser API for making HTTP requests
- `setNotes(data)` - Updates state, triggers re-render

#### 3. Creating a Note

```javascript
const addNote = async (note) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
  const newNote = await response.json();
  setNotes([newNote, ...notes]);  // Add to beginning of array
};
```

#### 4. Component Hierarchy

```
App
├── NoteForm          (handles create/edit)
└── NoteList
    └── NoteCard      (displays single note)
        ├── Edit button → triggers onEdit
        └── Delete button → triggers onDelete
```

---

## Key Concepts Explained

### 1. What is MERN Stack?

MERN is an acronym for four technologies:
- **M**ongoDB - NoSQL database (stores data as JSON-like documents)
- **E**xpress - Backend web framework for Node.js
- **R**eact - Frontend JavaScript library for building UIs
- **N**ode.js - JavaScript runtime for server-side code

### 2. REST API

REST (Representational State Transfer) is an architectural style for APIs:
- Uses HTTP methods (GET, POST, PUT, DELETE)
- Stateless - each request contains all info needed
- URLs represent resources (`/api/notes`, `/api/notes/:id`)

### 3. MongoDB vs SQL

| MongoDB (NoSQL)           | SQL (MySQL, PostgreSQL)    |
|---------------------------|----------------------------|
| Documents (JSON-like)     | Tables with rows           |
| Collections               | Tables                     |
| Flexible schema           | Fixed schema               |
| `{ _id: ObjectId(...) }`  | Primary key (integer)      |

### 4. CORS (Cross-Origin Resource Sharing)

When frontend (`localhost:5173`) makes requests to backend (`localhost:5001`), browsers block it by default (security). CORS middleware allows these cross-origin requests.

```javascript
app.use(cors());  // Allows all origins (for development)
```

### 5. Environment Variables

Store configuration outside code:
- Database URLs, API keys, ports
- Different values for development/production
- Never commit `.env` to version control (add to `.gitignore`)

---

## Common Issues & Solutions

### "EADDRINUSE: address already in use"
Another process is using the port. Either:
- Kill the process: `lsof -i :5001` then `kill -9 PID`
- Change the port in `.env`

### "MongoDB connection error"
- Make sure MongoDB is running (`mongod`)
- Check `MONGODB_URI` in `.env` is correct

### "Network Error" in frontend
- Make sure backend is running
- Check `API_URL` in `App.jsx` matches backend port

---

## Next Steps for Learning

1. **Add user authentication** - JWT tokens, login/signup
2. **Add categories/tags** - Organize notes
3. **Add search functionality** - Filter notes by title/content
4. **Deploy the app** - Use MongoDB Atlas, Render, or Vercel
5. **Add tests** - Jest for backend, React Testing Library for frontend

---

## Resources

- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [Mongoose Documentation](https://mongoosejs.com/docs/)
- [Vite Documentation](https://vitejs.dev/)
