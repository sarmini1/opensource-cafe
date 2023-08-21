import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CafeItem from "./CafeItem";
import CafeMenu from './CafeMenu';

const testSnacks = [
  {
    "id": "nachos",
    "name": "Nachos",
    "description": "An American classic!",
    "recipe": "Cover expensive, organic tortilla chips with Cheez Whiz.",
    "serve": "Serve in a hand-thrown ceramic bowl, garnished with canned black olives"
  },
  {
    "id": "hummus",
    "name": "Hummus",
    "description": "Sure to impress your vegan friends!",
    "recipe": "Purchase one container of hummus.",
    "serve": "Place unceremoniously on the table, along with pita bread."
  }
];

it('mounts without crashing', function () {
  render(
    <MemoryRouter>
      <CafeItem items={testSnacks} cantFind={"/snacks"} />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { container } = render(
    <MemoryRouter>
      <CafeItem items={testSnacks} cantFind={"/snacks"} />
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

it("renders appropriate item content from URL parameter", function () {
  const { container } = render(
    <MemoryRouter initialEntries={["/snacks/nachos"]}>
      <Routes>
        <Route path="/snacks/:id" element={
          <CafeItem
            items={testSnacks}
            cantFind={('/snacks')}
          />}
        >
        </Route>
      </Routes>
    </MemoryRouter>
  );

  expect(container).toContainHTML("Cover expensive, organic tortilla chips with Cheez Whiz.");
});

it("navigates back to snacks page when item can't be found", function () {
  const { container } = render(
    <MemoryRouter initialEntries={["/snacks/fake-snack"]}>
      <Routes>
        <Route
          path="/snacks/:id"
          element={
            <CafeItem
              items={testSnacks}
              cantFind={('/snacks')}
            />}
        >
        </Route>
        <Route
          path="/snacks"
          element={
            <CafeMenu
              type="snacks"
              items={testSnacks}
              title="Snacks"
            />}
        />
      </Routes>
    </MemoryRouter>
  );

  expect(container).toContainHTML('Please enjoy some of our snacks listed below!');
  expect(container).not.toContainHTML('CafeItem');
});