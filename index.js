'use strict';

var {jsx: _jsx} = require('react/jsx-runtime');
var newlineRegex = /(\r\n|\r|\n)/g;

module.exports = function(str) {
  if (typeof str !== 'string') {
    return str;
  }

  return str.split(newlineRegex).map(function(line, index) {
    if (line.match(newlineRegex)) {
      return _jsx('br', { key: index });
    }
    return line;
  });
};
