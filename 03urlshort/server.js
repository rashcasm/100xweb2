// url shortner server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const validUrl = require('valid-url');
const shortid = require('shortid');

const app = express();
const PORT = process.env.PORT || 5000;
