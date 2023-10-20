'use strict';

var { createElement } = require('react');
var newlineRegex = /(\r\n|\r|\n)/g;

module.exports = function(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.split(newlineRegex).map(function(line, index) {
    if (line.match(newlineRegex)) {
      return createElement('br', { key: index });
    }
    return line;
  });
};
