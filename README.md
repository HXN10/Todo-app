# Todo App

A modern, responsive Todo application with user authentication and theme switching capabilities.

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
- JavaScript (ES6+)
- Local Storage for Theme Persistence

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
node server.js
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
project/
├── public/
│   └── index.html
├── data/
│   ├── users.json
│   └── todos.json
├── server.js
├── package.json
└── README.md
```

## API Endpoints

- `GET /api/users` - Get all users
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Save todos

## License

MIT 