import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import NavBar from "./NavBar";

it('mounts without crashing', function () {
  render(<MemoryRouter><NavBar /></MemoryRouter>);
});

it("matches snapshot", function () {
  const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>);
  expect(container).toMatchSnapshot();
});

it('displays appropriate links', function () {
  const { getByText } = render(<MemoryRouter><NavBar /></MemoryRouter>);

  const homeLink = getByText(/openSource Cafe/i);
  expect(homeLink).toBeInTheDocument();

  const snackLink = getByText(/Snacks/i);
  expect(snackLink).toBeInTheDocument();

  const drinkLink = getByText(/Drinks/i);
  expect(drinkLink).toBeInTheDocument();

  const newItemFormLink = getByText(/Add an Item!/i);
  expect(newItemFormLink).toBeInTheDocument();
});

it('navigates to links correctly', function () {
  const { container } = render(<MemoryRouter><NavBar /></MemoryRouter>);

  const snackLink = container.querySelector('.NavLink-snacks');
  fireEvent.click(snackLink);
});