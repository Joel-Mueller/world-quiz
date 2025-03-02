const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

const users = []; // Mock database

// Register user
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        return res.status(400).json({ message: "Username or password empty" });
    }
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ username, password: hashedPassword });
    res.json({ message: "User registered successfully" });
});

// Login user
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Protected route
app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
