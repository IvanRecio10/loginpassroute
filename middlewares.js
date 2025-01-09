const express = require('express');

const middlewares = [
  express.urlencoded({ extended: true }), 
  express.json(), 
];

module.exports = middlewares;
