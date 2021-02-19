const Tutorial = require('./app/models/Tutorial');

(async () => {
    //console.log((await Tutorial.findAll()));
    console.log((await Tutorial.findOne('602f8bd6a8f2881844d481f0')));
})();