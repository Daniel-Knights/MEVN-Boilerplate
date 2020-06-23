const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression()); // Enable deflate/gzip
app.use(
    helmet({
        // Allow use in iframe
        frameguard: false
    })
); // Protect HTTP headers

// Routes
app.use("/api/posts", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/direct", require("./routes/email/direct"));

// Handle production
if (process.env.NODE_ENV === "production") {
    // Static folder
    app.use(express.static(__dirname + "/public/"));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
