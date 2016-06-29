'use strict';

var Promise = require('../');

var p = new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve();
    }, 1000)
}).then(function(){
    console.log('resolve');
    return 'test'
}, function(){
    console.log('reject');
});


p.then(function(value){
    console.log(value);
    console.log('resolve2');
}, function  (e) {
    console.log('reject2');
    console.error(e.message);
})


