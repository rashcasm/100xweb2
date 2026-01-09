// url shortner server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define URL schema and model
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    urlCode: String,
    date: { type: String, default: Date.now }
});

const Url = mongoose.model('Url', urlSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    const baseUrl = 'http://localhost:5000';

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL');
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check original url
    if (validUrl.isUri(originalUrl)) {
        try {
            let url = await Url.findOne({ originalUrl });
            if (url) {
                res.json(url);
            } else {
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    originalUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();
                res.json(url);
            }
        } catch (err) {
            console.error(err);
            res.status(500).json('Server error');
        }
    } else {
        res.status(401).json('Invalid original URL');
    }
});