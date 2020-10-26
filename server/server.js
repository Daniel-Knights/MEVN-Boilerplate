const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: 'http://www.example.com' }));
app.use(morgan('dev'));
app.use(compression()); // Enable deflate/gzip
app.use(
    helmet({
        // Allow use in iframe
        frameguard: false,
    })
); // Protect HTTP headers

// Use this to create your JWT Secret then delete
const hexStr = require('crypto')
    .randomBytes(64)
    .toString('hex');
console.log('JWT Secret:', hexStr);

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/direct', require('./routes/email/direct'));

// app.use(function forceLiveDomain(req, res, next) {
//     const host = req.get('Host');

//     if (host.includes('herokuapp')) {
//         return res.redirect(301, 'https://www.example.com' + req.originalUrl);
//     }

//     next();
// });

// Handle production
if (process.env.NODE_ENV === 'production') {
    // Static folder
    app.use(express.static(__dirname + '/public/'));

    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// app.use(function forceLiveDomain(req, res, next) {
//     res.redirect(301, 'https://www.example.com' + req.originalUrl);

//     next();
// });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
