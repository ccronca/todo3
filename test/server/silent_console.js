// 'use strict';

// var fs = require('fs');
// var util = require('util');
// var log = fs.createWriteStream('var/stdout.log');

// console.log = console.info = function(t) {
//     var out;
//     if (t && ~t.indexOf('%')) {
//         out = util.format.apply(util, arguments);
//         process.stdout.write(out + '\n');
//         return;
//     } else {
//         out = Array.prototype.join.call(arguments, ' ');
//     }
//     out && log.write(out + '\n');
// };
