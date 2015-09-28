const nl2br = require('.');
const React = require('react');
const assert = require('assert');

describe('nl2br', function(){
  it('newlines', function(){
    const result = nl2br('aaa\nbbb\nccc\nddd');
    const expected = ['aaa', React.createElement('br'), 'bbb', React.createElement('br'), 'ccc', React.createElement('br'), 'ddd'];
    assert.deepEqual(expected, result);
  });
});

