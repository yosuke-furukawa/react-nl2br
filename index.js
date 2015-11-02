'use strict';

var React = require('react');
var newlineRegex = /(\r\n|\n\r|\r|\n)/g;

module.exports = function(str) {
  if (typeof str != 'string') {
    throw new TypeError('nl2br requires string');
  }
  return str.split(newlineRegex).map(function(line) {
    if (line.match(newlineRegex)) {
      return React.createElement('br');
    } else {
      return line;
    }
  });
};
