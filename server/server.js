const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// User Schema & Model
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
});

const statSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    front: { type: Object, required: true },
    back: { type: Object, required: true },
    attempts: { type: Object, required: true }
});

const User = mongoose.model("User", userSchema);
const Stat = mongoose.model("Stat", statSchema);



app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    if (username === '' || password === '') {
        return res.status(400).json({ message: "Username or password empty" });
    }

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword });

        res.json({ message: "User registered successfully", userId: newUser._id });
    } catch (err) {
        res.status(500).json({ message: "Error registering user", error: err.message });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id, username }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, userId: user._id });
    } catch (err) {
        res.status(500).json({ message: "Error logging in", error: err.message });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(403).json({ message: "Token required" });

    jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

app.get("/protected", authenticateToken, (req, res) => {
    res.json({ message: `Hello, ${req.user.username}! This is a protected route.` });
});

app.post("/stats", authenticateToken, async (req, res) => {
    try {
        const { front, back, attempts } = req.body;

        if (!front || !back || !attempts) {
            return res.status(400).json({ message: "Missing stat data" });
        }

        const newStat = new Stat({
            userId: req.user.userId,
            front,
            back,
            attempts
        });

        await newStat.save();
        res.status(201).json({ message: "Stat saved successfully", stat: newStat });
    } catch (err) {
        res.status(500).json({ message: "Error saving stat", error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
