// Define middleware functions corresponding to each "function" node


function function1(payload) {
    payload.f1='f1'
    console.log('one....');
    return payload;
}

function function2(payload) {
    payload.f2='f2'
    console.log('two....');
    return payload;
}

function function3(payload) {
    payload.f3='f3'
    console.log('three....');
    return payload;
}

function function4(payload) {
    payload.f4='f4'
    console.log('four...');
    return payload;
}



// Define error handling middleware
function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(499).send('Something broke!');
}

module.exports = {
    function1,
    function2,
    function3,
    function4,
    errorHandler
};