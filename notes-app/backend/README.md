# Notes App - Backend

A RESTful API server built with Node.js, Express, and MongoDB.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Guide](#setup-guide)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Dependencies Explained](#dependencies-explained)
- [File-by-File Code Explanation](#file-by-file-code-explanation)
  - [package.json](#1-packagejson)
  - [.env](#2-env)
  - [server.js](#3-srcserverjs)
  - [Note.js (Model)](#4-srcmodelsnotejs)
  - [noteRoutes.js](#5-srcroutesnoteroutesjs)
- [How Everything Connects](#how-everything-connects)
- [Request-Response Flow](#request-response-flow)

---

## Prerequisites

Before setting up the backend, make sure you have:

| Requirement | Version | Check Command      | Download Link                                                 |
| ----------- | ------- | ------------------ | ------------------------------------------------------------- |
| Node.js     | v18+    | `node --version`   | [nodejs.org](https://nodejs.org/)                             |
| npm         | v9+     | `npm --version`    | Comes with Node.js                                            |
| MongoDB     | v6+     | `mongod --version` | [mongodb.com](https://www.mongodb.com/try/download/community) |

### Optional Tools (Recommended)

| Tool            | Purpose                          | Download Link                                                       |
| --------------- | -------------------------------- | ------------------------------------------------------------------- |
| MongoDB Compass | GUI to view and manage your data | [mongodb.com/compass](https://www.mongodb.com/try/download/compass) |
| Postman         | Test API endpoints               | [postman.com/downloads](https://www.postman.com/downloads/)         |

---

## Setup Guide

### Step 1: Navigate to backend folder

```bash
cd notes-app/backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Create environment file

Create a `.env` file in the backend folder:

```bash
touch .env
```

Add the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5001
```

### Step 4: Start MongoDB

Make sure MongoDB is running on your machine:

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB should run as a service, or start manually:
# "C:\Program Files\MongoDB\Server\6.0\bin\mongod.exe"
```

### Step 5: Run the server

```bash
# Development mode (recommended - auto-restarts on changes)
npm run dev

# OR Production mode
npm start
```

You should see:

```
Server running on port 5001
Connected to MongoDB
```

---

## Installation

```bash
# Install all dependencies
npm install
```

This will install the following packages:

```bash
npm install express mongoose cors dotenv
```

| Package  | Install Command        | Purpose                                           |
| -------- | ---------------------- | ------------------------------------------------- |
| express  | `npm install express`  | Web framework for creating HTTP server and routes |
| mongoose | `npm install mongoose` | MongoDB ODM (Object Document Mapper)              |
| cors     | `npm install cors`     | Enable Cross-Origin Resource Sharing              |
| dotenv   | `npm install dotenv`   | Load environment variables from .env file         |

---

## Folder Structure

```
backend/
├── src/
│   ├── models/
│   │   └── Note.js           # Database schema
│   ├── routes/
│   │   └── noteRoutes.js     # API endpoints
│   └── server.js             # Main entry point
├── .env                      # Environment variables
├── package.json              # Project configuration
└── package-lock.json         # Dependency lock file
```

---

## Dependencies Explained

| Package  | Version | Purpose                                           |
| -------- | ------- | ------------------------------------------------- |
| express  | ^4.18.2 | Web framework for creating HTTP server and routes |
| mongoose | ^8.0.3  | MongoDB ODM (Object Document Mapper)              |
| cors     | ^2.8.5  | Enable Cross-Origin Resource Sharing              |
| dotenv   | ^16.3.1 | Load environment variables from .env file         |

---

## File-by-File Code Explanation

### 1. `package.json`

```json
{
  "name": "notes-app-backend",
  "version": "1.0.0",
  "description": "Backend for MERN notes app",
  "main": "src/server.js",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "node --watch src/server.js"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "mongoose": "^8.0.3"
  }
}
```

#### Line-by-Line Explanation:

```json
"name": "notes-app-backend",
```

- **What**: The name of your package/project
- **Why**: Used when publishing to npm or for identification

```json
"version": "1.0.0",
```

- **What**: Semantic versioning (MAJOR.MINOR.PATCH)
- **Why**: Track changes - 1.0.0 means first stable release

```json
"description": "Backend for MERN notes app",
```

- **What**: Brief description of the project
- **Why**: Documentation and npm search

```json
"main": "src/server.js",
```

- **What**: Entry point file for the application
- **Why**: Tells Node.js which file to run when starting the app

```json
"type": "module",
```

- **What**: Enables ES Modules syntax
- **Why**: Allows using `import/export` instead of `require()`
- **Without this**: You'd have to use `const express = require('express')`
- **With this**: You can use `import express from 'express'`

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "node --watch src/server.js"
},
```

- **What**: Custom commands you can run with `npm run <script-name>`
- `npm start` or `npm run start`: Runs the server normally (production)
- `npm run dev`: Runs with `--watch` flag
  - `--watch`: Node.js auto-restarts when files change (hot reload)
  - Great for development - no manual restart needed

```json
"dependencies": {
  "cors": "^2.8.5",
  ...
}
```

- **What**: Packages your project needs to run
- **The `^` symbol**: Allows minor and patch updates
  - `^2.8.5` means any version `>=2.8.5` and `<3.0.0`

---

### 2. `.env`

```env
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5001
```

#### Line-by-Line Explanation:

```env
MONGODB_URI=mongodb://localhost:27017/notesapp
```

- **What**: MongoDB connection string
- **Breaking it down**:
  - `mongodb://` - Protocol (like http://)
  - `localhost` - Database server location (your machine)
  - `27017` - Default MongoDB port
  - `notesapp` - Database name (created automatically if doesn't exist)

```env
PORT=5001
```

- **What**: Port number for the Express server
- **Why**: Separates config from code
- **Benefit**: Easy to change without modifying code

#### Why use .env files?

1. **Security**: Keep secrets out of code (API keys, passwords)
2. **Flexibility**: Different values for dev/staging/production
3. **Best Practice**: Never commit .env to git (add to .gitignore)

---

### 3. `src/server.js`

This is the main entry point - the heart of your backend.

```javascript
import express from 'express'
```

- **What**: Import the Express framework
- **Why**: Express provides methods to create server, handle routes, middleware
- **What you get**: A function to create an Express application

```javascript
import mongoose from 'mongoose'
```

- **What**: Import Mongoose ODM (Object Document Mapper or Object Document Modeling)
- **Why**: Provides schema-based solution for MongoDB
- **What you get**: Methods to connect to DB, create models, query data

```javascript
import cors from 'cors'
```

- **What**: Import CORS middleware
- **Why**: Browsers block requests from different origins by default
- **Example**: Frontend (localhost:5173) → Backend (localhost:5001) = blocked without CORS

```javascript
import dotenv from 'dotenv'
```

- **What**: Import dotenv package
- **Why**: Loads variables from .env file into `process.env`

```javascript
import { fileURLToPath } from 'url'
```

- **What**: Import a utility function from Node's built-in 'url' module
- **Why**: Converts a file URL to a file path
- **Example**: `file:///Users/kiran/project/server.js` → `/Users/kiran/project/server.js`

```javascript
import { dirname, join } from 'path'
```

- **What**: Import path utilities from Node's built-in 'path' module
- **`dirname`**: Extracts directory path from full file path
  - `/Users/kiran/project/server.js` → `/Users/kiran/project`
- **`join`**: Joins path segments safely (handles / or \ based on OS)
  - `join('/users', 'kiran', 'file.js')` → `/users/kiran/file.js`

```javascript
import noteRoutes from './routes/noteRoutes.js'
```

- **What**: Import our custom routes file
- **Why**: Keeps route definitions separate from server setup
- **The `./`**: Means "relative to current file's directory"
- **Must include `.js`**: Required in ES Modules

```javascript
const __filename = fileURLToPath(import.meta.url)
```

- **What**: Get the current file's absolute path
- **`import.meta.url`**: Special ES Module variable containing file's URL
  - Returns: `file:///Users/kiran/Developer/Bootcamp/notes-app/backend/src/server.js`
- **`fileURLToPath()`**: Converts URL to path
  - Returns: `/Users/kiran/Developer/Bootcamp/notes-app/backend/src/server.js`
- **Why needed**: In CommonJS, `__filename` exists automatically. In ES Modules, it doesn't.

```javascript
const __dirname = dirname(__filename)
```

- **What**: Get the current file's directory
- **`dirname()`**: Removes the filename, keeps the directory
  - Input: `/Users/kiran/.../backend/src/server.js`
  - Output: `/Users/kiran/.../backend/src`
- **Why needed**: We need to navigate to parent folder to find `.env`

```javascript
dotenv.config({ path: join(__dirname, '..', '.env') })
```

- **What**: Load environment variables from .env file
- **`join(__dirname, '..', '.env')`**: Build path to .env
  - `__dirname` = `/Users/kiran/.../backend/src`
  - `'..'` = Go up one directory
  - `'.env'` = The file name
  - Result: `/Users/kiran/.../backend/.env`
- **Why path option**: Default `dotenv.config()` looks in current directory
- **After this line**: `process.env.MONGODB_URI` and `process.env.PORT` are available

```javascript
const app = express()
```

- **What**: Create an Express application instance
- **Why**: This `app` object has all methods for:
  - Setting up middleware: `app.use()`
  - Defining routes: `app.get()`, `app.post()`, etc.
  - Starting server: `app.listen()`
- **Think of it as**: Creating your web server object

```javascript
// Middleware
app.use(cors())
```

- **What**: Enable CORS for all routes
- **`app.use()`**: Register middleware that runs on every request
- **`cors()`**: Returns a middleware function
- **What it does**: Adds headers to responses allowing cross-origin requests
  - `Access-Control-Allow-Origin: *`
  - `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`
- **Without this**: Browser would block frontend requests to backend

```javascript
app.use(express.json())
```

- **What**: Parse JSON request bodies
- **Why**: When frontend sends JSON data, Express doesn't understand it by default
- **What it does**:
  - Checks if request has `Content-Type: application/json`
  - Parses the JSON string into JavaScript object
  - Attaches it to `req.body`
- **Example**:
  - Client sends: `'{"title": "Hello"}'` (string)
  - `req.body` becomes: `{ title: "Hello" }` (object)

```javascript
// Routes
app.use('/api/notes', noteRoutes)
```

- **What**: Mount the noteRoutes at `/api/notes` path
- **How it works**:
  - All routes in `noteRoutes` are prefixed with `/api/notes`
  - Route `'/'` in noteRoutes → `/api/notes/`
  - Route `'/:id'` in noteRoutes → `/api/notes/:id`
- **Why `/api/`**: Convention to distinguish API routes from page routes

```javascript
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
```

- **What**: Connect to MongoDB database
- **`process.env.MONGODB_URI`**: Gets value from .env file
- **Returns**: A Promise (async operation)
- **What happens**:
  1. Mongoose establishes connection to MongoDB server
  2. Creates database if it doesn't exist
  3. Keeps connection open for queries

```javascript
  .then(() => console.log('Connected to MongoDB'))
```

- **What**: Promise success handler
- **When**: Runs after successful connection
- **Why**: Confirmation that database is ready

```javascript
  .catch((err) => console.error('MongoDB connection error:', err));
```

- **What**: Promise error handler
- **When**: Runs if connection fails
- **Common reasons for failure**:
  - MongoDB not running
  - Wrong connection string
  - Network issues

```javascript
const PORT = process.env.PORT || 5000
```

- **What**: Set the port number
- **`process.env.PORT`**: From .env file (5001)
- **`|| 5000`**: Fallback if PORT not defined
- **Why fallback**: Safety net if .env is missing

```javascript
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
```

- **What**: Start the HTTP server
- **`app.listen(PORT, callback)`**:
  - First argument: Port number to listen on
  - Second argument: Function to run when server starts
- **What happens**:
  1. Express creates HTTP server
  2. Server binds to the specified port
  3. Server starts accepting incoming connections
  4. Callback runs, confirming server is ready

---

### 4. `src/models/Note.js`

This defines the structure of data stored in MongoDB.

```javascript
import mongoose from 'mongoose'
```

- **What**: Import Mongoose
- **Why**: Need it to create Schema and Model

```javascript
const noteSchema = new mongoose.Schema({
```

- **What**: Create a new Schema object
- **Schema**: Blueprint/template for documents
- **Why**: Defines structure, types, validation rules
- **MongoDB is schemaless but**: Mongoose adds schema layer for:
  - Data validation
  - Type casting
  - Default values
  - Query building

```javascript
  title: {
    type: String,
    required: true,
    trim: true
  },
```

- **`title`**: Field name in the document
- **`type: String`**: Only accepts string values
  - If you pass number 123, it becomes "123"
- **`required: true`**: Document can't be saved without title
  - Throws ValidationError if missing
- **`trim: true`**: Removes whitespace from both ends
  - `"  Hello World  "` becomes `"Hello World"`

```javascript
  content: {
    type: String,
    required: true
  },
```

- **`content`**: The note's body text
- **`type: String`**: Must be a string
- **`required: true`**: Can't create note without content

```javascript
  color: {
    type: String,
    default: '#ffffff'
  }
```

- **`color`**: Background color for the note
- **`type: String`**: Stored as string (hex color code)
- **`default: '#ffffff'`**: If not provided, uses white
  - When creating: `new Note({ title: 'Hi', content: 'Hello' })`
  - Color automatically becomes `'#ffffff'`

```javascript
}, {
  timestamps: true
});
```

- **What**: Schema options (second argument)
- **`timestamps: true`**: Mongoose automatically adds:
  - `createdAt`: Date when document was created
  - `updatedAt`: Date when document was last modified
- **Benefit**: No manual date handling needed

```javascript
export default mongoose.model('Note', noteSchema)
```

- **What**: Create and export a Model
- **`mongoose.model('Note', noteSchema)`**:
  - First argument: Model name ('Note')
  - Second argument: Schema to use
- **What this creates**:
  - A constructor function for creating documents
  - Methods for querying: `.find()`, `.findById()`, etc.
- **Collection name**: Mongoose pluralizes and lowercases → 'notes'
- **`export default`**: Makes this the main export of the file

#### What's the difference between Schema and Model?

| Schema                  | Model                         |
| ----------------------- | ----------------------------- |
| Blueprint/template      | Constructor based on schema   |
| Defines structure       | Creates/queries documents     |
| No database operations  | Interacts with database       |
| Like a class definition | Like a class instance factory |

---

### 5. `src/routes/noteRoutes.js`

This file contains all the API endpoint handlers.

```javascript
import express from 'express'
```

- **What**: Import Express
- **Why**: Need `express.Router()` to create route handlers

```javascript
import Note from '../models/Note.js'
```

- **What**: Import the Note model
- **`'../models/Note.js'`**: Go up one directory (`..`), then into `models`
- **Why**: Need the model to interact with database

```javascript
const router = express.Router()
```

- **What**: Create a new Router instance
- **Why**: Router is a mini-application for handling routes
- **Benefit**: Organize routes into separate files
- **Methods available**: `router.get()`, `router.post()`, `router.put()`, `router.delete()`

---

#### GET All Notes

```javascript
router.get('/', async (req, res) => {
```

- **`router.get()`**: Handle GET requests
- **`'/'`**: Route path (becomes `/api/notes/` when mounted)
- **`async`**: Function can use `await` for async operations
- **`(req, res)`**: Request and Response objects
  - `req`: Contains request data (headers, body, params)
  - `res`: Methods to send response

```javascript
  try {
```

- **What**: Start try-catch block
- **Why**: Database operations can fail, need error handling

```javascript
const notes = await Note.find().sort({ createdAt: -1 })
```

- **`Note.find()`**: Mongoose method to get documents
  - No arguments = get all documents
  - Returns an array of notes
- **`.sort({ createdAt: -1 })`**: Sort the results
  - `createdAt`: Field to sort by
  - `-1`: Descending order (newest first)
  - `1`: Would be ascending (oldest first)
- **`await`**: Wait for database operation to complete
- **`const notes`**: Store the result array

```javascript
res.json(notes)
```

- **What**: Send JSON response
- **`res.json()`**:
  - Sets `Content-Type: application/json`
  - Converts JavaScript object/array to JSON string
  - Sends the response
- **Default status**: 200 OK

```javascript
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
```

- **`catch (error)`**: If anything in `try` block fails
- **`res.status(500)`**: Set HTTP status to 500 (Internal Server Error)
- **`.json({ message: error.message })`**: Send error details
- **Common errors**: Database connection lost, invalid query

```javascript
});
```

- **What**: End of route handler function

---

#### GET Single Note

```javascript
router.get('/:id', async (req, res) => {
```

- **`'/:id'`**: Route with URL parameter
  - `:id` is a placeholder
  - `/api/notes/abc123` → `req.params.id = 'abc123'`
- **Why**: Need to identify which note to retrieve

```javascript
  try {
    const note = await Note.findById(req.params.id);
```

- **`Note.findById()`**: Find document by its `_id`
- **`req.params.id`**: The ID from the URL
- **Returns**: Single document or `null` if not found

```javascript
if (!note) {
  return res.status(404).json({ message: 'Note not found' })
}
```

- **`if (!note)`**: Check if note exists
- **`return`**: Stop function execution here
- **`res.status(404)`**: 404 = Not Found
- **Why return**: Prevents sending multiple responses

```javascript
res.json(note)
```

- **What**: Send the found note
- **Only reached if**: Note was found

```javascript
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

- **Why 500 instead of 404**:
  - Invalid ID format throws error (goes to catch)
  - Valid ID but not found returns null (handled above)

---

#### POST Create Note

```javascript
router.post('/', async (req, res) => {
```

- **`router.post()`**: Handle POST requests
- **POST**: HTTP method for creating resources
- **`'/'`**: Path `/api/notes/`

```javascript
const note = new Note({
  title: req.body.title,
  content: req.body.content,
  color: req.body.color,
})
```

- **`new Note({})`**: Create a new Note instance (not saved yet)
- **`req.body`**: Data sent by client (parsed by `express.json()`)
- **Example req.body**:
  ```json
  {
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread",
    "color": "#ffeb3b"
  }
  ```
- **What happens**: Mongoose validates and applies defaults

```javascript
  try {
    const newNote = await note.save();
```

- **`note.save()`**: Save document to database
- **What happens**:
  1. Mongoose validates against schema
  2. If valid, sends to MongoDB
  3. MongoDB creates document with `_id`
  4. Returns the created document with `_id`, `createdAt`, `updatedAt`
- **`await`**: Wait for save to complete
- **`newNote`**: The saved document with all fields

```javascript
res.status(201).json(newNote)
```

- **`res.status(201)`**: 201 = Created (success, resource created)
- **`.json(newNote)`**: Send back the created note
- **Why return it**: Client needs the `_id` and timestamps

```javascript
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

- **`400`**: Bad Request (client sent invalid data)
- **Common causes**:
  - Missing required fields
  - Wrong data types
  - Validation failures

---

#### PUT Update Note

```javascript
router.put('/:id', async (req, res) => {
```

- **`router.put()`**: Handle PUT requests
- **PUT**: HTTP method for updating resources
- **`'/:id'`**: Which note to update

```javascript
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
```

- **First**: Find the existing note
- **Why not findByIdAndUpdate**: We want to update only provided fields

```javascript
if (req.body.title) note.title = req.body.title
if (req.body.content) note.content = req.body.content
if (req.body.color) note.color = req.body.color
```

- **What**: Conditional field updates
- **`if (req.body.title)`**: Only update if field was sent
- **Why this pattern**: Allows partial updates
  - Send `{ title: "New Title" }` → only title changes
  - Send `{ title: "New", content: "Text" }` → both change
- **Falsy check note**: Empty string `""` would be skipped

```javascript
const updatedNote = await note.save()
```

- **`note.save()`**: Save the modified document
- **What happens**:
  - Mongoose validates changes
  - Updates `updatedAt` timestamp
  - Saves to database
- **`updatedNote`**: The updated document

```javascript
res.json(updatedNote)
```

- **What**: Send back updated note
- **Default status**: 200 OK

```javascript
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

- **`400`**: Validation errors from bad data

---

#### DELETE Note

```javascript
router.delete('/:id', async (req, res) => {
```

- **`router.delete()`**: Handle DELETE requests
- **DELETE**: HTTP method for removing resources

```javascript
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
```

- **First**: Check if note exists
- **Why check**: Give meaningful error if already deleted

```javascript
await note.deleteOne()
```

- **`note.deleteOne()`**: Remove document from database
- **Why not `Note.findByIdAndDelete()`**: Both work, this shows another approach
- **After this**: Document is permanently removed

```javascript
res.json({ message: 'Note deleted' })
```

- **What**: Confirm deletion
- **Why not return note**: It's deleted, just confirm success

```javascript
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
```

- **`500`**: Server error during deletion

---

```javascript
export default router
```

- **What**: Export the router
- **Why**: So `server.js` can import and use it
- **`export default`**: Main/only export from this file

---

## How Everything Connects

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                      server.js                          │
                    │                                                         │
  ┌──────────┐      │   ┌─────────┐    ┌──────────┐    ┌─────────────────┐   │
  │  .env    │──────│──>│ dotenv  │───>│  config  │    │                 │   │
  └──────────┘      │   └─────────┘    └──────────┘    │                 │   │
                    │                                   │   express()     │   │
                    │   ┌─────────┐                     │       │         │   │
                    │   │  cors   │─────────────────────│───>  use()     │   │
                    │   └─────────┘                     │       │         │   │
                    │                                   │       │         │   │
                    │   ┌─────────┐                     │       │         │   │
                    │   │  json   │─────────────────────│───>  use()     │   │
                    │   └─────────┘                     │       │         │   │
                    │                                   │       │         │   │
                    │   ┌─────────────┐                 │       │         │   │
                    │   │ noteRoutes  │─────────────────│───>  use()     │   │
                    │   └─────────────┘                 │       │         │   │
                    │         │                         │       │         │   │
                    │         │                         │    listen()     │   │
                    │         │                         └─────────────────┘   │
                    └─────────│───────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │                    noteRoutes.js                        │
                    │                                                         │
                    │   GET /          ──────>   Note.find()                  │
                    │   GET /:id       ──────>   Note.findById()              │
                    │   POST /         ──────>   new Note().save()            │
                    │   PUT /:id       ──────>   Note.findById() + save()     │
                    │   DELETE /:id    ──────>   Note.deleteOne()             │
                    │                                                         │
                    └─────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────────────────────────────────────────┐
                    │                      Note.js                            │
                    │                                                         │
                    │   Schema: { title, content, color, timestamps }         │
                    │                           │                             │
                    │                           ▼                             │
                    │                    mongoose.model()                     │
                    │                           │                             │
                    └───────────────────────────│─────────────────────────────┘
                                                │
                                                ▼
                                         ┌────────────┐
                                         │  MongoDB   │
                                         │            │
                                         │ Collection:│
                                         │  "notes"   │
                                         └────────────┘
```

---

## Request-Response Flow

### Example: Creating a Note

```
1. Client sends POST request
   ─────────────────────────────────────────────────────────────────────>
   POST /api/notes
   Content-Type: application/json

   { "title": "My Note", "content": "Hello World" }

2. Express receives request
   │
   ├── cors middleware adds headers (allows request)
   │
   ├── express.json() parses body
   │   req.body = { title: "My Note", content: "Hello World" }
   │
   ├── Router matches POST /api/notes
   │
   └── Route handler executes

3. Route handler
   │
   ├── Creates Note instance
   │   note = new Note({ title: "My Note", content: "Hello World" })
   │
   ├── Mongoose validates
   │   ✓ title: present, is string
   │   ✓ content: present, is string
   │   ✓ color: missing, use default "#ffffff"
   │
   ├── Mongoose saves to MongoDB
   │   MongoDB assigns _id, timestamps
   │
   └── Handler sends response

4. Response sent back
   <─────────────────────────────────────────────────────────────────────
   HTTP 201 Created
   Content-Type: application/json

   {
     "_id": "507f1f77bcf86cd799439011",
     "title": "My Note",
     "content": "Hello World",
     "color": "#ffffff",
     "createdAt": "2024-01-15T10:30:00.000Z",
     "updatedAt": "2024-01-15T10:30:00.000Z",
     "__v": 0
   }
```

### The `__v` Field

- **What**: Version key added by Mongoose
- **Why**: Tracks document revisions for concurrency control
- **Value**: Increments when arrays are modified using `$push`, `$pull`, etc.

---

## HTTP Status Codes Used

| Code | Meaning               | When Used                   |
| ---- | --------------------- | --------------------------- |
| 200  | OK                    | Successful GET, PUT, DELETE |
| 201  | Created               | Successful POST             |
| 400  | Bad Request           | Invalid data sent           |
| 404  | Not Found             | Resource doesn't exist      |
| 500  | Internal Server Error | Server/database failure     |

---

## Testing the API

### Using curl

```bash
# Create a note
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", "content": "Hello"}'

# Get all notes
curl http://localhost:5001/api/notes

# Get one note (replace ID)
curl http://localhost:5001/api/notes/YOUR_NOTE_ID

# Update a note
curl -X PUT http://localhost:5001/api/notes/YOUR_NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a note
curl -X DELETE http://localhost:5001/api/notes/YOUR_NOTE_ID
```

### Using Postman

#### Setup

1. Download Postman from [postman.com/downloads](https://www.postman.com/downloads/)
2. Create a new Collection called "Notes App"
3. Add requests for each endpoint

---

#### 1. GET All Notes

| Field  | Value                             |
| ------ | --------------------------------- |
| Method | `GET`                             |
| URL    | `http://localhost:5001/api/notes` |

**Steps:**

1. Click **+** to create new request
2. Select **GET** from dropdown
3. Enter URL: `http://localhost:5001/api/notes`
4. Click **Send**

**Expected Response (200 OK):**

```json
[
  {
    "_id": "6578a1b2c3d4e5f6a7b8c9d0",
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread",
    "color": "#ffeb3b",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z",
    "__v": 0
  }
]
```

---

#### 2. GET Single Note

| Field  | Value                                 |
| ------ | ------------------------------------- |
| Method | `GET`                                 |
| URL    | `http://localhost:5001/api/notes/:id` |

**Steps:**

1. Select **GET**
2. Enter URL: `http://localhost:5001/api/notes/6578a1b2c3d4e5f6a7b8c9d0`
   - Replace with actual `_id` from your database
3. Click **Send**

**Expected Response (200 OK):**

```json
{
  "_id": "6578a1b2c3d4e5f6a7b8c9d0",
  "title": "Shopping List",
  "content": "Milk, Eggs, Bread",
  "color": "#ffeb3b",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

**If note not found (404):**

```json
{
  "message": "Note not found"
}
```

---

#### 3. POST Create Note

| Field  | Value                             |
| ------ | --------------------------------- |
| Method | `POST`                            |
| URL    | `http://localhost:5001/api/notes` |

**Steps:**

1. Select **POST**
2. Enter URL: `http://localhost:5001/api/notes`
3. Go to **Body** tab
4. Select **raw**
5. Select **JSON** from dropdown (instead of Text)
6. Enter the JSON body:

```json
{
  "title": "My First Note",
  "content": "This is the content of my note",
  "color": "#4caf50"
}
```

7. Click **Send**

**Screenshot Guide:**

```
┌─────────────────────────────────────────────────────────────┐
│  POST ▼  │ http://localhost:5001/api/notes      │  Send   │
├─────────────────────────────────────────────────────────────┤
│  Params   Authorization   Headers   Body ●   ...            │
├─────────────────────────────────────────────────────────────┤
│  ○ none  ○ form-data  ○ x-www-form-urlencoded              │
│  ● raw ▼  ○ binary  ○ GraphQL                    JSON ▼    │
├─────────────────────────────────────────────────────────────┤
│  1  {                                                       │
│  2    "title": "My First Note",                            │
│  3    "content": "This is the content of my note",         │
│  4    "color": "#4caf50"                                   │
│  5  }                                                       │
└─────────────────────────────────────────────────────────────┘
```

**Expected Response (201 Created):**

```json
{
  "_id": "6578a1b2c3d4e5f6a7b8c9d0",
  "title": "My First Note",
  "content": "This is the content of my note",
  "color": "#4caf50",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z",
  "__v": 0
}
```

**If validation fails (400 Bad Request):**

```json
{
  "message": "Note validation failed: title: Path `title` is required."
}
```

---

#### 4. PUT Update Note

| Field  | Value                                 |
| ------ | ------------------------------------- |
| Method | `PUT`                                 |
| URL    | `http://localhost:5001/api/notes/:id` |

**Steps:**

1. Select **PUT**
2. Enter URL: `http://localhost:5001/api/notes/6578a1b2c3d4e5f6a7b8c9d0`
   - Replace with actual `_id`
3. Go to **Body** tab
4. Select **raw** → **JSON**
5. Enter only the fields you want to update:

```json
{
  "title": "Updated Title",
  "color": "#e91e63"
}
```

6. Click **Send**

**Expected Response (200 OK):**

```json
{
  "_id": "6578a1b2c3d4e5f6a7b8c9d0",
  "title": "Updated Title",
  "content": "This is the content of my note",
  "color": "#e91e63",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T11:45:00.000Z",
  "__v": 0
}
```

Note: `updatedAt` changed, `content` stayed the same (partial update)

---

#### 5. DELETE Note

| Field  | Value                                 |
| ------ | ------------------------------------- |
| Method | `DELETE`                              |
| URL    | `http://localhost:5001/api/notes/:id` |

**Steps:**

1. Select **DELETE**
2. Enter URL: `http://localhost:5001/api/notes/6578a1b2c3d4e5f6a7b8c9d0`
   - Replace with actual `_id`
3. Click **Send** (no body needed)

**Expected Response (200 OK):**

```json
{
  "message": "Note deleted"
}
```

---

#### Postman Tips

**Save Requests:**

- Click **Save** after creating each request
- Organize in the "Notes App" collection

**Use Variables:**

1. Click on collection → **Variables** tab
2. Add variable: `baseUrl` = `http://localhost:5001/api`
3. Use in URLs: `{{baseUrl}}/notes`

**View Response:**

- **Body**: See JSON response
- **Headers**: See response headers
- **Status**: See HTTP status code (200, 201, 404, etc.)
- **Time**: See response time in ms

**Common Mistakes:**
| Problem | Solution |
|---------|----------|
| "Could not send request" | Make sure backend server is running |
| Empty response | Check URL is correct |
| 400 Bad Request | Check JSON body is valid |
| 404 Not Found | Check the ID exists |
| CORS error | This won't happen in Postman (only browsers)
