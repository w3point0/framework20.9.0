const { function1, function2, function3, function4, errorHandler } = require('./middleware/functions');
const express = require('express');

//---------------------------------------------------------------
// Define middleware functions corresponding to each "function" node
//---------------------------------------------------------------
const _function1 = (payload, req, res, next) => {
    function1(payload)
    console.log('Function 1 executed');
    next();
};

const _function2 = (payload, req, res, next) => {
    function2(payload)
    console.log('Function 2 executed');
    next();
};

const _function3 = (payload, req, res, next) => {
    function3(payload)
    console.log('Function 3 executed');
    next();
};

const _function4 = (payload, req, res, next) => {
    function4(payload)
    console.log('Function 4 executed');
    next();
};

//---------------------------------------------------------------
// Define error handling middleware
//---------------------------------------------------------------
const app = express();
const port = 3001;

//---------------------------------------------------------------
// Define routes
//---------------------------------------------------------------
const payload = {f1:'',f2:'',f3:'',f4:''}
app.get('/magic', _function1.bind(null, payload), _function2.bind(null, payload), _function3.bind(null, payload), _function4.bind(null, payload),
    (req, res) => {
        console.log('yippy',payload)
        res.send('Magic happened');
    }
);

// Global error handler
app.use(errorHandler);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});