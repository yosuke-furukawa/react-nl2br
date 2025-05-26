const Module = require('module');
const { test } = require('vitest');
const assert = require('node:assert/strict');

const React = {
  createElement(type, props) {
    return { type, props };
  },
};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'react/jsx-runtime') {
    return { jsx: (type, props) => React.createElement(type, props) };
  }
  return originalLoad(request, parent, isMain);
};

const nl2br = require('.');
Module._load = originalLoad;

test('should parse newlines', () => {
  const result = nl2br('aaa\nbbb\nccc\nddd');
  const expected = [
    'aaa',
    React.createElement('br', { key: 1 }),
    'bbb',
    React.createElement('br', { key: 3 }),
    'ccc',
    React.createElement('br', { key: 5 }),
    'ddd',
  ];
  assert.deepStrictEqual(expected, result);
});

test('should return numbers', () => {
  const result = nl2br(42);
  const expected = 42;
  assert.deepStrictEqual(expected, result);
});

test('should return undefined if the param is undefined', () => {
  const result = nl2br(undefined);
  const expected = undefined;
  assert.deepStrictEqual(expected, result);
});

test('should return null if the param is null', () => {
  const result = nl2br(null);
  const expected = null;
  assert.deepStrictEqual(expected, result);
});

test('should return an array if the param is an array', () => {
  const arr = [];
  const result = nl2br(arr);
  assert.deepStrictEqual(arr, result);
});

test('should return an object if the param is an object', () => {
  const obj = {};
  const result = nl2br(obj);
  assert.deepStrictEqual(obj, result);
});
  
test('should return a boolean if the param is a boolean', () => {
  const result = nl2br(false);
  const expected = false;
  assert.deepStrictEqual(expected, result);
});

test('should return the given React component if the param is a React component', () => {
  const component = React.createElement('p', {}, 'Lorem ipsum');
  const result = nl2br(component);
  assert.strictEqual(component, result);
});

