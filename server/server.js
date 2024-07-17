const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const dotenv = require("dotenv");

const app = express();
const PORT = process.env.PORT || 5000;
// Charger les variables d'environnement depuis le fichier .env
dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Environnement : " + process.env.PORT);

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/products', require('./routes/products'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
