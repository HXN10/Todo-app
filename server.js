const express = require('express');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Read data from JSON file
async function readData(filePath) {
    try {
        const data = await fsPromises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return { todos: {} };  // Changed to object to store todos per user
    }
}

// Write data to JSON file
async function writeData(filePath, data) {
    try {
        await fsPromises.writeFile(filePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to file:', error);
        throw error;
    }
}

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get todos
app.get('/api/todos', async (req, res) => {
    try {
        const userId = req.query.userId;  // Get userId from query parameter
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const data = await readData(path.join(__dirname, 'data', 'todos.json'));
        const userTodos = data.todos[userId] || [];
        res.json({ todos: userTodos });
    } catch (error) {
        res.status(500).json({ error: 'Failed to read todos' });
    }
});

// Save todos
app.post('/api/todos', async (req, res) => {
    try {
        const { todos, userId } = req.body;  // Get userId from request body
        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const data = await readData(path.join(__dirname, 'data', 'todos.json'));
        data.todos[userId] = todos;  // Store todos under user's ID
        await writeData(path.join(__dirname, 'data', 'todos.json'), data);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save todos' });
    }
});

// Get users
app.get('/api/users', async (req, res) => {
    try {
        const data = await readData(path.join(__dirname, 'data', 'users.json'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to read users' });
    }
});

// Register user
app.post('/api/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const users = await readData(path.join(__dirname, 'data', 'users.json'));

        // Check if user already exists
        if (users.some(user => user.email === email || user.username === username)) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Add new user
        users.push({ email, username, password });
        await writeData(path.join(__dirname, 'data', 'users.json'), users);

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const users = await readData(path.join(__dirname, 'data', 'users.json'));

        // Find user by email or username
        const user = users.find(u => 
            (u.email === identifier || u.username === identifier) && 
            u.password === password
        );

        if (user) {
            res.json({ 
                success: true, 
                user: { 
                    email: user.email, 
                    username: user.username 
                } 
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: 'Invalid email/username or password' 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Login failed' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('=================================');
    console.log(`Server running on port ${PORT}`);
    console.log(`Visit http://localhost:${PORT}`);
    console.log('=================================');
    
    // Verify important files exist
    const publicPath = path.join(__dirname, 'public');
    const dataPath = path.join(__dirname, 'data');
    const indexPath = path.join(publicPath, 'index.html');
    
    console.log('Checking required files:');
    console.log(`Public directory exists: ${fs.existsSync(publicPath)}`);
    console.log(`Data directory exists: ${fs.existsSync(dataPath)}`);
    console.log(`index.html exists: ${fs.existsSync(indexPath)}`);
    console.log('=================================');
}); 