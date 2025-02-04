/** @jest-environment jsdom */
import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from './App';


test('App should render', () => {
  render(<App />);

  expect(screen.getByText('Welcome, party people!')).toBeInTheDocument();
});

test('Button should render', () => {
  render(<App />);
  
  expect(screen.getByText('Current theme: light')).toBeInTheDocument();
});

test('theme button should update button text', () => {
  render(<App />);
  const button = screen.getByText('Current theme: light');
  
  fireEvent.click(button);
  
  expect(button).toHaveTextContent('Current theme: dark');
  
  fireEvent.click(button);
  
  expect(button).toHaveTextContent('Current theme: light');
});


test('theme button should toggle styles', () => {
  render(<App />);
  const button = screen.getByText('Current theme: light');
  
  expect(document.body).toHaveStyle('color: #333');
  expect(document.body).toHaveStyle('background-color: #FFF');
  
  fireEvent.click(button);
  
  expect(document.body).toHaveStyle('color: #FFF');
  expect(document.body).toHaveStyle('background-color: #333');
  
  fireEvent.click(button);
  
  expect(document.body).toHaveStyle('color: #333');
  expect(document.body).toHaveStyle('background-color: #FFF');
});

test('hidden button should toggle hidden content', () => {
  render(<App />);
  const button = screen.getByText('Show hidden content');
  
  expect(screen.queryByText('this content is hidden by default')).not.toBeInTheDocument();
  
  fireEvent.click(button);
  
  expect(screen.getByText('this content is hidden by default')).toBeInTheDocument();
  
  fireEvent.click(button);
  
  expect(screen.queryByText('this content is hidden by default')).not.toBeInTheDocument();
});
