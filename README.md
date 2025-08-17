# Todo App

A modern, responsive Todo application with user authentication and theme switching capabilities.

by Hasan wehba, Yacine mostafa


## Features

- User Authentication (Sign Up/Login)
- Dark/Light Theme Switching
- Todo Management (Create, Read, Update, Delete)
- Category Filtering
- Search Functionality
- Drag and Drop Reordering
- Progress Tracking
- Responsive Design

## Technologies Used

- Node.js
- Express.js
- HTML5
- CSS3
- JavaScript 

## Installation

1. Clone the repository:
```bash
git clone [your-repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start 
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
todo-app/
├── public/
│   ├── index.html      # Main application file
│   └── styles.css      # Styling
├── data/
│   ├── todos.json      # Todo data storage
│   └── users.json      # User data storage
├── server.js           # Backend server
├── package.json        # Project configuration
└── README.md          # Documentation
```


## API Endpoints

### Authentication
- `GET /api/users` - Get all users
- `POST /api/register` - Register a new user
  - Body: `{ email, username, password }`
- `POST /api/login` - Login user
  - Body: `{ identifier (email/username), password }`

### Todo Management
- `GET /api/todos` - Get all todos for a user
  - Query: `userId`
- `POST /api/todos` - Save todos
  - Body: `{ todos: [], userId }`

## License

MIT 
