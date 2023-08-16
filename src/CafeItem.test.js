import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import CafeItem from "./CafeMenu";

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