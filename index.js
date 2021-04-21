/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const path = require('path');
const express = require('express');

const app = express(); // create express app

const port = process.env.PORT || 5000;

// add middlewares
app.use(express.static(path.join(__dirname, '.', 'public')));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '.', 'public', 'index.html'));
});

// start express server on port 5000
app.listen(port, () => {
  console.log(`server started on ${port} `);
});
