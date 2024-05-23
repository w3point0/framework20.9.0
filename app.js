const { function1, function2, function3, function4, errorHandler } = require('./middleware/functions');
const express = require('express');

//---------------------------------------------------------------
// Define a generic middleware function wrapper
//---------------------------------------------------------------
const createMiddleware = (fn) => (payload, req, res, next) => {
    fn(payload);
    console.log(`${fn.name} executed`);
    next();
};

// Wrap each function using the generic wrapper
const _function1 = createMiddleware(function1);
const _function2 = createMiddleware(function2);
const _function3 = createMiddleware(function3);
const _function4 = createMiddleware(function4);

//---------------------------------------------------------------
// Define error handling middleware
//---------------------------------------------------------------
const app = express();
const port = 3001;

//---------------------------------------------------------------
// Define routes
//---------------------------------------------------------------
const payload = { f1: '', f2: '', f3: '', f4: '' };
app.get('/magic', _function1.bind(null, payload), _function2.bind(null, payload), _function3.bind(null, payload), _function4.bind(null, payload),
    (req, res) => {
        console.log('yippy', payload);
        res.send('Magic happened');
    }
);

// Global error handler
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
