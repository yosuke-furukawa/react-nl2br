import { test, expect } from 'vitest'; // Changed from describe, it
import nl2br from '.'; 
import React from 'react';

test('nl2br should correctly parse newlines in a string into <br /> elements', () => {
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
  expect(result).toEqual(expected);
});

test('nl2br should return numbers as is when passed a number', () => {
  const result = nl2br(42);
  const expected = 42;
  expect(result).toEqual(expected);
});

test('nl2br should return undefined as is when passed undefined', () => {
  const result = nl2br(undefined);
  const expected = undefined;
  expect(result).toEqual(expected);
});

test('nl2br should return null as is when passed null', () => {
  const result = nl2br(null);
  const expected = null;
  expect(result).toEqual(expected);
});

test('nl2br should return an empty array as is when passed an empty array', () => {
  const result = nl2br([]);
  const expected = [];
  expect(result).toEqual(expected);
});

test('nl2br should return an empty object as is when passed an empty object', () => {
  const result = nl2br({});
  const expected = {};
  expect(result).toEqual(expected);
});

test('nl2br should return a boolean (false) as is when passed a boolean (false)', () => {
  const result = nl2br(false);
  const expected = false;
  expect(result).toEqual(expected);
});

test('nl2br should return a boolean (true) as is when passed a boolean (true)', () => {
  const result = nl2br(true);
  const expected = true;
  expect(result).toEqual(expected);
});

test('nl2br should return the given React component as is when passed a React component', () => {
  const component = React.createElement('p', {}, 'Lorem ipsum');
  const result = nl2br(component);
  expect(result).toBe(component);
});
