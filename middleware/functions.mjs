// Define middleware functions corresponding to each "function" node
// module.mjs
import logger from '../logger.mjs';

// Function definitions
export function function1(payload) {
    payload.f1 = 'f1';
    logger.info
    return payload;
}

export function function2(payload) {
    payload.f2 = 'f2';
    logger.info('two....');
    return payload;
}

export function function3(payload) {
    payload.f3 = 'f3';
    logger.info('three....');
    return payload;
}

export function function4(payload) {
    payload.f4 = 'f4';
    logger.info('four....');
    return payload;
}

// Error handling middleware
export function errorHandler(err, req, res, next) {
    logger.error(err.stack);
    res.status(499).send('Something broke!');
}
