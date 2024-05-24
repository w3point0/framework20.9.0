import express from 'express';
import 'dotenv/config';
import logger from './logger.mjs';
import { function1, function2, function3, function4, errorHandler } from './middleware/functions.mjs';

// Define a generic middleware function wrapper
const createMiddleware = (fn) => (req, res, next) => {
    const payload = req.payload || { f1: '', f2: '', f3: '', f4: '' };
    req.payload = fn(payload);
    logger.info(`${fn.name} executed`);
    next();
};

// Wrap each function using the generic wrapper
const _function1 = createMiddleware(function1);
const _function2 = createMiddleware(function2);
const _function3 = createMiddleware(function3);
const _function4 = createMiddleware(function4);

// Define error handling middleware
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static('public'));

// Add payload initialization middleware
app.use((req, res, next) => {
    req.payload = { f1: '', f2: '', f3: '', f4: '' };
    next();
});

// Define routes
app.get('/stream', _function1, _function2, _function3, _function4, (req, res) => {
    logger.info('Viewing stream');
    res.send('<div style="text-align: center;">See the logger output to verify the function streams were called</div>');
});

// Global error handler
app.use(errorHandler);

app.listen(port, () => {
    logger.info(`Example app listening at http://localhost:${port}`);
});
