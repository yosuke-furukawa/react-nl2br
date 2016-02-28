const nl2br = require('.');
const React = require('react');
const assert = require('assert');

describe('nl2br', function(){
  it('should parse newlines', function(){
    const result = nl2br('aaa\nbbb\nccc\nddd');
    const expected = [
      'aaa',
      React.createElement('br', { key: 1 }),
      'bbb',
      React.createElement('br', { key: 3 }),
      'ccc',
      React.createElement('br', { key: 5 }),
      'ddd'
    ];
    assert.deepEqual(expected, result);
  });

  it('should return numbers', function (){
    const result = nl2br(42);
    const expected = 42;
    assert.deepEqual(expected, result);
  });

  it('should return an empty string if the param is undefined', function () {
    const result = nl2br(undefined);
    const expected = '';
    assert.deepEqual(expected, result);
  });

  it('should return an empty string if the param is null', function () {
    const result = nl2br(null);
    const expected = '';
    assert.deepEqual(expected, result);
  });

  it('should return an empty string if the param is an array', function () {
    const result = nl2br([]);
    const expected = '';
    assert.deepEqual(expected, result);
  });

  it('should return an empty string if the param is an object', function () {
    const result = nl2br({});
    const expected = '';
    assert.deepEqual(expected, result);
  });
});

