const express = require("express");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression()); // Enable deflate/gzip
app.use(helmet()); // Protect HTTP headers

// Routes
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

// Handle production
if (process.env.NODE_ENV === "production") {
    // Static folder
    app.use(express.static(__dirname + "/public/"));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
