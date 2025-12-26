# Bootcamp - Full-Stack MERN Notes Application

A comprehensive full-stack note-taking application built with the MERN stack (MongoDB, Express, React, Node.js) with Docker support for easy deployment.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
  - [Option 1: Docker Deployment (Recommended)](#option-1-docker-deployment-recommended)
  - [Option 2: Local Development](#option-2-local-development)
- [API Documentation](#api-documentation)
- [Architecture Deep Dive](#architecture-deep-dive)
- [Environment Variables](#environment-variables)
- [Troubleshooting](#troubleshooting)
- [Next Steps](#next-steps)
- [Resources](#resources)

---

## Project Overview

This application is a production-ready note-taking system that allows users to create, edit, delete, and organize notes with color-coded categories. The project demonstrates modern full-stack development practices including:

- RESTful API design
- MongoDB database with Mongoose ODM
- React frontend with hooks
- Docker containerization
- Multi-stage Docker builds for optimization
- Environment-based configuration
- Health checks and monitoring

---

## Features

### Core Functionality
- **Create Notes** - Add notes with title, content, and color coding
- **Edit Notes** - Update existing notes seamlessly
- **Delete Notes** - Remove notes with confirmation
- **Color Coding** - Organize notes using 6 preset colors
- **Responsive Design** - Mobile-friendly grid layout
- **Real-time Updates** - Instant UI updates after operations

### Technical Features
- RESTful API with Express
- MongoDB database with automatic timestamps
- Docker containerization for easy deployment
- Health checks for backend and database
- CORS-enabled for cross-origin requests
- Production-ready multi-stage Docker builds
- Non-root user security in containers

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| **Frontend** | React | 19.2.0 | UI library with hooks |
| | Vite | 7.2.4 | Build tool and dev server |
| | Lucide React | 0.556.0 | Icon library |
| **Backend** | Node.js | 20 | JavaScript runtime |
| | Express | 4.18.2 | Web framework for REST API |
| | Mongoose | 8.0.3 | MongoDB ODM |
| | CORS | 2.8.5 | Cross-origin resource sharing |
| **Database** | MongoDB | 7.0 | NoSQL database |
| **DevOps** | Docker | - | Containerization |
| | Docker Compose | 3.8 | Multi-container orchestration |

---

## Project Structure

```
Bootcamp/
├── notes-app/                    # Main MERN application
│   ├── backend/
│   │   ├── src/
│   │   │   ├── models/
│   │   │   │   └── Note.js       # MongoDB schema definition
│   │   │   ├── routes/
│   │   │   │   └── noteRoutes.js # API route handlers
│   │   │   └── server.js         # Express server entry point
│   │   ├── .env                  # Environment variables
│   │   ├── .env.example          # Environment template
│   │   ├── Dockerfile            # Multi-stage production build
│   │   ├── docker-compose.yml    # MongoDB + Backend orchestration
│   │   └── package.json          # Backend dependencies
│   │
│   └── frontend/
│       ├── src/
│       │   ├── components/
│       │   │   ├── NoteCard.jsx      # Individual note display
│       │   │   ├── NoteCard.css
│       │   │   ├── NoteForm.jsx      # Create/Edit form
│       │   │   ├── NoteForm.css
│       │   │   ├── NoteList.jsx      # Notes grid layout
│       │   │   └── NoteList.css
│       │   ├── App.jsx               # Main app component
│       │   ├── App.css               # Main styles
│       │   ├── main.jsx              # React entry point
│       │   └── index.css             # Global styles
│       ├── package.json              # Frontend dependencies
│       └── vite.config.js            # Vite configuration
│
├── notes-frontend/               # Standalone frontend version
├── BACKEND_SETUP_GUIDE.html     # Backend setup documentation
├── FRONTEND_SETUP_GUIDE.html    # Frontend setup documentation
└── README.md                     # This file
```

---

## Prerequisites

### For Docker Deployment (Recommended)
- **Docker** - [Download](https://www.docker.com/products/docker-desktop)
- **Docker Compose** (included with Docker Desktop)

To verify installation:
```bash
docker --version          # Should show 20.x.x or higher
docker-compose --version  # Should show 2.x.x or higher
```

### For Local Development
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v7.0) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

To verify installation:
```bash
node --version    # Should show v18.x.x or higher
npm --version     # Should show 9.x.x or higher
mongod --version  # Should show MongoDB version 7.x.x
```

---

## Installation & Setup

### Option 1: Docker Deployment (Recommended)

This method uses Docker Compose to run MongoDB and the backend in containers.

#### Step 1: Navigate to Backend Directory
```bash
cd notes-app/backend
```

#### Step 2: Configure Environment Variables
```bash
cp .env.example .env
```

Edit `.env` if needed (default values work out of the box):
```env
NODE_ENV=production
PORT=5001
MONGODB_URI=mongodb://admin:securepassword@mongodb:27017/notesapp?authSource=admin
MONGO_USERNAME=admin
MONGO_PASSWORD=securepassword
```

#### Step 3: Start Docker Containers
```bash
docker-compose up -d
```

This will:
- Pull MongoDB 7.0 image
- Build the backend Node.js application
- Create a Docker network for communication
- Start both services with health checks
- Persist MongoDB data in Docker volumes

#### Step 4: Verify Services
```bash
docker-compose ps
```

You should see:
```
NAME                  STATUS              PORTS
notes-app-backend     Up (healthy)        0.0.0.0:5001->5001/tcp
notes-app-mongodb     Up (healthy)        0.0.0.0:27017->27017/tcp
```

#### Step 5: View Logs
```bash
docker-compose logs -f
```

#### Step 6: Setup Frontend
```bash
cd ../frontend
npm install
npm run dev
```

#### Step 7: Access Application
- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend API: [http://localhost:5001/api/notes](http://localhost:5001/api/notes)

#### Docker Management Commands

```bash
# Stop containers
docker-compose down

# Stop and remove volumes (⚠️ deletes all data)
docker-compose down -v

# Restart services
docker-compose restart

# View logs
docker-compose logs backend
docker-compose logs mongodb

# Rebuild after code changes
docker-compose up -d --build
```

---

### Option 2: Local Development

Use this method for active development without Docker.

#### Step 1: Install MongoDB Locally

Choose your operating system:

**macOS (using Homebrew):**
```bash
# Install Homebrew if you haven't already
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Tap MongoDB repository
brew tap mongodb/brew

# Install MongoDB Community Edition
brew install mongodb-community@7.0

# Start MongoDB as a service
brew services start mongodb-community@7.0

# Verify installation
mongosh --version
```

**Ubuntu/Debian Linux:**
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg \
   --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB service
sudo systemctl start mongod
sudo systemctl enable mongod

# Verify installation
mongosh --version
```

**Windows:**
```powershell
# Download MongoDB Community Server from:
# https://www.mongodb.com/try/download/community

# Run the installer (.msi file)
# Choose "Complete" installation
# Install as a Windows Service (recommended)

# MongoDB will start automatically
# Verify installation in PowerShell:
mongosh --version
```

**Alternative: MongoDB Atlas (Cloud Database - Free Tier)**
```bash
# Sign up at https://www.mongodb.com/cloud/atlas
# Create a free M0 cluster
# Get your connection string
# Update MONGODB_URI in .env with the Atlas connection string
```

#### Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# You should see:
# Current Mongosh Log ID: ...
# Connecting to: mongodb://127.0.0.1:27017/?directConnection=true
# Using MongoDB: 7.0.x

# Exit mongosh
exit
```

#### Step 3: Install Backend Dependencies
```bash
cd notes-app/backend
npm install
```

#### Step 4: Configure Environment
Create `.env` in `backend/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/notesapp
PORT=5001
```

#### Step 5: Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### Step 7: Start MongoDB (if not running as service)
Open a new terminal:
```bash
# If MongoDB is NOT running as a service
mongod

# Or if MongoDB is running as a system service
brew services start mongodb-community@7.0  # macOS
sudo systemctl start mongod                # Linux
net start MongoDB                          # Windows (as Administrator)
```

#### Step 8: Start Backend Server
Open a new terminal:
```bash
cd notes-app/backend
npm run dev
```

Expected output:
```
Server running on port 5001
Connected to MongoDB
```

#### Step 9: Start Frontend Dev Server
Open a new terminal:
```bash
cd notes-app/frontend
npm run dev
```

Expected output:
```
VITE v7.2.4  ready in 234 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### Step 10: Access Application
Navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

### MongoDB Management Commands

Useful commands for managing MongoDB locally:

```bash
# Check MongoDB status
brew services list                         # macOS
sudo systemctl status mongod               # Linux
sc query MongoDB                          # Windows

# Stop MongoDB
brew services stop mongodb-community@7.0  # macOS
sudo systemctl stop mongod                # Linux
net stop MongoDB                          # Windows (as Administrator)

# Restart MongoDB
brew services restart mongodb-community@7.0  # macOS
sudo systemctl restart mongod                # Linux
net stop MongoDB && net start MongoDB        # Windows (as Administrator)

# Connect to MongoDB shell
mongosh

# View all databases
show dbs

# Use the notes database
use notesapp

# View all collections
show collections

# View all notes
db.notes.find()

# Delete all notes
db.notes.deleteMany({})

# Drop the entire database
db.dropDatabase()
```

---

## API Documentation

The backend exposes a RESTful API on `http://localhost:5001/api/notes`

### Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| `GET` | `/api/notes` | Get all notes (sorted by newest) | - | `200 OK` Array of notes |
| `GET` | `/api/notes/:id` | Get single note by ID | - | `200 OK` Note object |
| `POST` | `/api/notes` | Create a new note | `{ title, content, color }` | `201 Created` Note object |
| `PUT` | `/api/notes/:id` | Update existing note | `{ title?, content?, color? }` | `200 OK` Updated note |
| `DELETE` | `/api/notes/:id` | Delete a note | - | `200 OK` Deleted note |

### Note Object Schema

```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "My Note",
  "content": "Note content goes here",
  "color": "#ffeb3b",
  "createdAt": "2024-12-10T12:00:00.000Z",
  "updatedAt": "2024-12-10T12:00:00.000Z"
}
```

### API Usage Examples

#### Create a Note
```bash
curl -X POST http://localhost:5001/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Shopping List",
    "content": "Milk, Eggs, Bread",
    "color": "#ffeb3b"
  }'
```

#### Get All Notes
```bash
curl http://localhost:5001/api/notes
```

#### Get Single Note
```bash
curl http://localhost:5001/api/notes/507f1f77bcf86cd799439011
```

#### Update a Note
```bash
curl -X PUT http://localhost:5001/api/notes/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Shopping List",
    "content": "Milk, Eggs, Bread, Cheese"
  }'
```

#### Delete a Note
```bash
curl -X DELETE http://localhost:5001/api/notes/507f1f77bcf86cd799439011
```

---

## Architecture Deep Dive

### Backend Architecture

#### 1. Server Entry Point ([backend/src/server.js](notes-app/backend/src/server.js))

```javascript
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
```

**Key Responsibilities:**
- Initialize Express application
- Connect to MongoDB using Mongoose
- Configure middleware (CORS, JSON parsing)
- Register API routes
- Start HTTP server

**ES Modules Path Resolution:**
```javascript
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env') });
```
Since we use ES modules (`"type": "module"`), we manually recreate `__dirname` to locate the `.env` file.

#### 2. Database Model ([backend/src/models/Note.js](notes-app/backend/src/models/Note.js))

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
  timestamps: true
});
```

**Schema Features:**
- `required: true` - Field validation
- `trim: true` - Removes leading/trailing whitespace
- `default` - Fallback value if not provided
- `timestamps: true` - Auto-generates `createdAt` and `updatedAt`

#### 3. API Routes ([backend/src/routes/noteRoutes.js](notes-app/backend/src/routes/noteRoutes.js))

Routes use async/await for handling asynchronous database operations:

```javascript
// GET all notes - sorted by newest first
router.get('/', async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create note
router.post('/', async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      color: req.body.color
    });
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
```

**Key Concepts:**
- `async/await` - Modern asynchronous JavaScript
- `try/catch` - Error handling
- `req.body` - Request payload from client
- `req.params.id` - URL parameters (`:id`)
- `res.status()` - HTTP status codes
- `res.json()` - Send JSON response

---

### Frontend Architecture

#### 1. Main Application ([frontend/src/App.jsx](notes-app/frontend/src/App.jsx))

```javascript
const API_URL = 'http://localhost:5001/api/notes';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
```

**React Hooks Used:**
- `useState` - Manage component state (notes, editing state, loading, errors)
- `useEffect` - Fetch data when component mounts

#### 2. Data Fetching Pattern

```javascript
useEffect(() => {
  fetchNotes();
}, []);

const fetchNotes = async () => {
  try {
    setLoading(true);
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch notes');
    const data = await response.json();
    setNotes(data);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

- `useEffect` with empty dependency array `[]` runs once on mount
- `fetch()` - Browser API for HTTP requests
- Error handling with try/catch

#### 3. CRUD Operations

**Create:**
```javascript
const addNote = async (note) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
  const newNote = await response.json();
  setNotes([newNote, ...notes]);  // Prepend to array
};
```

**Update:**
```javascript
const updateNote = async (id, updatedNote) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedNote)
  });
  const updated = await response.json();
  setNotes(notes.map(note => note._id === id ? updated : note));
};
```

**Delete:**
```javascript
const deleteNote = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  setNotes(notes.filter(note => note._id !== id));
};
```

#### 4. Component Hierarchy

```
App
├── NoteForm (handles create & edit)
│   ├── Title input
│   ├── Content textarea
│   ├── Color picker
│   └── Submit button
│
└── NoteList (displays all notes)
    └── NoteCard (individual note)
        ├── Title
        ├── Content
        ├── Edit button → triggers onEdit
        └── Delete button → triggers onDelete
```

---

### Docker Architecture

#### Multi-Stage Dockerfile

The backend uses a multi-stage build for optimization:

**Stage 1: Dependencies**
```dockerfile
FROM node:20-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
```

**Stage 2: Production**
```dockerfile
FROM node:20-alpine AS production
RUN apk add --no-cache dumb-init
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
COPY --from=dependencies /app/node_modules ./node_modules
USER nodejs
CMD ["node", "src/server.js"]
```

**Benefits:**
- Smaller final image (only production dependencies)
- Security with non-root user
- Proper signal handling with dumb-init
- Health checks for monitoring

#### Docker Compose Services

**MongoDB Service:**
```yaml
mongodb:
  image: mongo:7.0
  environment:
    MONGO_INITDB_ROOT_USERNAME: admin
    MONGO_INITDB_ROOT_PASSWORD: securepassword
  volumes:
    - mongodb_data:/data/db
  healthcheck:
    test: mongosh --quiet --eval "db.runCommand('ping')"
```

**Backend Service:**
```yaml
backend:
  build: .
  depends_on:
    mongodb:
      condition: service_healthy
  environment:
    MONGODB_URI: mongodb://admin:securepassword@mongodb:27017/notesapp
```

**Key Features:**
- Service dependency management
- Health checks for reliability
- Data persistence with volumes
- Network isolation

---

## Environment Variables

### Backend Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `development` | No |
| `PORT` | Server port | `5001` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `MONGO_USERNAME` | MongoDB admin username | `admin` | Docker only |
| `MONGO_PASSWORD` | MongoDB admin password | - | Docker only |

### Frontend Variables

The API URL is hardcoded in [frontend/src/App.jsx](notes-app/frontend/src/App.jsx):
```javascript
const API_URL = 'http://localhost:5001/api/notes';
```

For production, update this to your deployed backend URL.

---

## Development Tools

### MongoDB Compass - Database GUI

MongoDB Compass is the official GUI for MongoDB. It provides a visual interface to explore and manipulate your data.

**Installation:**

**macOS:**
```bash
# Using Homebrew
brew install --cask mongodb-compass

# Or download from https://www.mongodb.com/try/download/compass
```

**Linux:**
```bash
# Download the .deb or .rpm package
wget https://downloads.mongodb.com/compass/mongodb-compass_1.40.4_amd64.deb
sudo dpkg -i mongodb-compass_1.40.4_amd64.deb

# Or use snap
sudo snap install mongodb-compass
```

**Windows:**
```powershell
# Download the installer from:
# https://www.mongodb.com/try/download/compass
# Run the .exe installer
```

**Using MongoDB Compass:**
1. Open MongoDB Compass
2. Connect to your local MongoDB:
   - **Connection String:** `mongodb://localhost:27017`
   - Click "Connect"
3. Navigate to the `notesapp` database
4. Browse the `notes` collection
5. View, edit, and delete documents visually

**Features:**
- Visual query builder
- Document validation
- Index management
- Performance insights
- Data import/export

---

### Postman - API Testing

Postman is a powerful tool for testing REST APIs.

**Installation:**

**macOS:**
```bash
brew install --cask postman
```

**Linux:**
```bash
# Download and install
wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
sudo tar -xzf postman.tar.gz -C /opt
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

**Windows:**
```powershell
# Download from: https://www.postman.com/downloads/
# Run the installer
```

**Quick Start with Postman:**

1. Create a new collection called "Notes API"
2. Add requests for each endpoint:

**GET All Notes:**
```
GET http://localhost:5001/api/notes
```

**POST Create Note:**
```
POST http://localhost:5001/api/notes
Headers: Content-Type: application/json
Body (raw JSON):
{
  "title": "Test Note",
  "content": "This is a test note",
  "color": "#ffeb3b"
}
```

**PUT Update Note:**
```
PUT http://localhost:5001/api/notes/{note_id}
Headers: Content-Type: application/json
Body (raw JSON):
{
  "title": "Updated Note"
}
```

**DELETE Note:**
```
DELETE http://localhost:5001/api/notes/{note_id}
```

---

### React DevTools - Browser Extension

React DevTools helps debug React applications by inspecting component hierarchies and state.

**Installation:**

**Chrome:**
```
Visit: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
Click "Add to Chrome"
```

**Firefox:**
```
Visit: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/
Click "Add to Firefox"
```

**Edge:**
```
Visit: https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil
Click "Get"
```

**Using React DevTools:**
1. Open your app in the browser: `http://localhost:5173`
2. Open Developer Tools (F12 or Cmd+Option+I on Mac)
3. Click on the "Components" or "Profiler" tab
4. Inspect component props, state, and hooks
5. Track component re-renders and performance

**Key Features:**
- Component tree inspection
- Props and state viewing/editing
- Hook inspection
- Performance profiling
- Highlight component updates

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
**Error:** `EADDRINUSE: address already in use :::5001`

**Solution:**
```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=5002
```

#### 2. MongoDB Connection Failed
**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solutions:**
- **Local:** Ensure MongoDB is running (`mongod`)
- **Docker:** Check container status (`docker-compose ps`)
- Verify `MONGODB_URI` in `.env`
- Check MongoDB logs: `docker-compose logs mongodb`

#### 3. CORS Errors in Frontend
**Error:** `Access-Control-Allow-Origin header`

**Solution:**
- Ensure backend is running
- Verify CORS is enabled in [backend/src/server.js](notes-app/backend/src/server.js)
- Check `API_URL` matches backend port

#### 4. Docker Container Won't Start
**Check logs:**
```bash
docker-compose logs backend
docker-compose logs mongodb
```

**Rebuild containers:**
```bash
docker-compose down -v
docker-compose up -d --build
```

#### 5. Frontend Build Errors
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
```

---

## Next Steps

### Feature Enhancements
1. **User Authentication**
   - JWT-based authentication
   - User registration and login
   - Protected routes

2. **Advanced Organization**
   - Tags and categories
   - Search functionality
   - Filters and sorting options

3. **Rich Text Editing**
   - Markdown support
   - Formatting toolbar
   - Code syntax highlighting

4. **Collaboration**
   - Share notes with others
   - Real-time collaboration
   - Comments and annotations

### Infrastructure Improvements
1. **Production Deployment**
   - Deploy to AWS/Heroku/DigitalOcean
   - Use MongoDB Atlas for database
   - Set up CI/CD pipeline

2. **Performance Optimization**
   - Implement caching (Redis)
   - Add pagination for large datasets
   - Optimize bundle size

3. **Testing**
   - Unit tests with Jest
   - Integration tests for API
   - E2E tests with Cypress

4. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics

---

## Resources

### Official Documentation
- [MongoDB Documentation](https://www.mongodb.com/docs/) - Complete MongoDB guide
- [MongoDB Installation Guide](https://www.mongodb.com/docs/manual/installation/) - Install MongoDB locally
- [Express.js Guide](https://expressjs.com/) - Express framework docs
- [React Documentation](https://react.dev/) - Official React docs
- [Mongoose Documentation](https://mongoosejs.com/) - MongoDB ODM for Node.js
- [Vite Documentation](https://vitejs.dev/) - Next generation frontend tooling
- [Docker Documentation](https://docs.docker.com/) - Container platform docs

### Learning Resources
- [MERN Stack Tutorial](https://www.mongodb.com/languages/mern-stack-tutorial) - Full stack guide
- [RESTful API Design](https://restfulapi.net/) - API best practices
- [React Hooks Guide](https://react.dev/reference/react) - Modern React patterns
- [Docker for Beginners](https://docker-curriculum.com/) - Docker fundamentals
- [MongoDB University](https://university.mongodb.com/) - Free MongoDB courses

### Development Tools (See detailed setup in Development Tools section above)
- [MongoDB Compass](https://www.mongodb.com/try/download/compass) - Official MongoDB GUI
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) - Cloud database (free tier available)
- [Postman](https://www.postman.com/downloads/) - API development and testing
- [React DevTools](https://react.dev/learn/react-developer-tools) - Browser extension for React debugging
- [VS Code](https://code.visualstudio.com/) - Recommended code editor with extensions:
  - ES7+ React/Redux/React-Native snippets
  - MongoDB for VS Code
  - REST Client (alternative to Postman)
  - Docker extension

---

## License

MIT

---

## Contributors

Built as part of the Developer Bootcamp curriculum.

---

**Happy Coding!** 🚀
