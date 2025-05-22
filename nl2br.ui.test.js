import { test, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import nl2br from './index'; // Assuming index.js is the main export

// Helper function to render the output of nl2br within a div
const renderNl2br = (input) => {
  return render(React.createElement('div', { 'data-testid': 'nl2br-output' }, nl2br(input)));
};

test('nl2br renders <br /> for newlines in a simple string', () => {
  const textWithNewlines = 'Hello\nWorld';
  const { container } = renderNl2br(textWithNewlines);
  
  // Check HTML structure
  expect(container.innerHTML).toContain('Hello<br>World');
  
  // Check for br tags specifically
  const brTags = container.querySelectorAll('br');
  expect(brTags.length).toBe(1);

  // Check text content around the <br>
  // React Testing Library's getByTestId can be used if the parent div has data-testid
  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('HelloWorld'); // RTL combines text content
  // For more precise text checks around <br>, innerHTML or individual text node checks might be needed
});

test('nl2br renders a string with no newlines as is', () => {
  const textWithoutNewlines = 'Hello World';
  renderNl2br(textWithoutNewlines);
  
  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('Hello World');
  expect(outputDiv.querySelectorAll('br').length).toBe(0);
});

test('nl2br renders an empty string as is', () => {
  const emptyText = '';
  renderNl2br(emptyText);
  
  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('');
  expect(outputDiv.querySelectorAll('br').length).toBe(0);
});

test('nl2br renders multiple consecutive newlines as multiple <br /> tags', () => {
  const textWithMultipleNewlines = 'Hello\n\nWorld';
  const { container } = renderNl2br(textWithMultipleNewlines);
  
  expect(container.innerHTML).toContain('Hello<br><br>World');
  const brTags = container.querySelectorAll('br');
  expect(brTags.length).toBe(2);

  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('HelloWorld');
});

test('nl2br renders numbers as text content', () => {
  const numberInput = 12345;
  renderNl2br(numberInput);
  
  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('12345');
  expect(outputDiv.querySelectorAll('br').length).toBe(0);
});

test('nl2br renders null as empty content', () => {
  // When null is passed to React.createElement as a child, it renders nothing.
  renderNl2br(null); 
  const outputDiv = screen.getByTestId('nl2br-output');
  // Depending on React version and how nl2br returns null, 
  // this might be empty or contain an empty comment node.
  // For nl2br, it returns null directly.
  expect(outputDiv).toBeEmptyDOMElement(); 
});

test('nl2br renders undefined as empty content', () => {
  // When undefined is passed to React.createElement as a child, it renders nothing.
  renderNl2br(undefined);
  const outputDiv = screen.getByTestId('nl2br-output');
  // nl2br returns undefined directly.
  expect(outputDiv).toBeEmptyDOMElement();
});

test('nl2br correctly handles mixed content with leading/trailing newlines', () => {
  const textWithMixedNewlines = '\nHello\nWorld\n';
  const { container } = renderNl2br(textWithMixedNewlines);
  
  expect(container.innerHTML).toContain('<br>Hello<br>World<br>');
  const brTags = container.querySelectorAll('br');
  expect(brTags.length).toBe(3);

  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv).toHaveTextContent('HelloWorld');
});

test('nl2br renders a string with only newlines as multiple <br /> tags', () => {
  const textWithOnlyNewlines = '\n\n\n';
  const { container } = renderNl2br(textWithOnlyNewlines);
  
  expect(container.innerHTML).toContain('<br><br><br>');
  const brTags = container.querySelectorAll('br');
  expect(brTags.length).toBe(3);

  const outputDiv = screen.getByTestId('nl2br-output');
  expect(outputDiv.textContent.trim()).toBe(''); // Check that there's no actual text content
});
