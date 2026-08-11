# Todo App for DevOps Learning

A simple, in-memory Todo REST API and web frontend built with Node.js, Express, and vanilla JavaScript. 
This project is explicitly designed to act as a foundational learning project for DevOps concepts such as Docker containerization, CI/CD with GitHub Actions, and Linux server deployment.

## Requirements
- Node.js (v18 or newer recommended)
- npm (Node Package Manager)

## Installation

1. Clone or navigate to the project directory:
   ```bash
   cd todo-devops
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Running locally

Start the server:
```bash
npm start
```
The application will run on `http://localhost:3000`. You can visit this URL in your browser to see the frontend.

For development with automatic restarts (Node.js 18+ required for --watch):
```bash
npm run dev
```

## Running tests

Run the Jest test suite for the REST API:
```bash
npm test
```

## API Documentation

The server exposes a REST API that manages the in-memory Todo items.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check endpoint, returns status ok |
| `GET` | `/api/todos` | Retrieves all todos |
| `GET` | `/api/todos/:id` | Retrieves a specific todo by its ID |
| `POST` | `/api/todos` | Creates a new todo (expects `{"title": "..."}`) |
| `PUT` | `/api/todos/:id` | Updates an existing todo (can include `title` and `completed` fields) |
| `DELETE` | `/api/todos/:id` | Deletes a todo by its ID |

## Example curl commands

**1. Check health:**
```bash
curl http://localhost:3000/health
```

**2. Get all todos:**
```bash
curl http://localhost:3000/api/todos
```

**3. Create a new todo:**
```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn GitHub Actions"}'
```

**4. Update a todo:**
```bash
curl -X PUT http://localhost:3000/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**5. Delete a todo:**
```bash
curl -X DELETE http://localhost:3000/api/todos/1
```
