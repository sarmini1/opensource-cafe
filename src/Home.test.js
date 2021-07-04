import React from 'react';
import { render } from '@testing-library/react';
import Home from "./Home";

const testDrinks = [
  {
    "id": "martini",
    "name": "Martini",
    "description": "An ice-cold, refreshing classic.",
    "recipe": "Mix 3 parts vodka & 1 part dry vermouth.",
    "serve": "Serve very cold, straight up."
  },
  {
    "id": "negroni",
    "name": "Negroni",
    "description": "A nice drink for a late night conversation.",
    "recipe": "Mix equal parts of gin, Campari, and sweet vermouth.",
    "serve": "Serve cold, either on the rocks or straight up."
  }];

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
  }];


it('renders without crashing', function () {
  render(<Home drinks={testDrinks} snacks={testSnacks} />);
});

it("matches snapshot", function () {
  const { container } = render(<Home
    drinks={testDrinks}
    snacks={testSnacks} />);
  expect(container).toMatchSnapshot();
});


it('displays menu of drink options when rendered', function () {
  const { debug, container } = render(<Home
    drinks={testDrinks}
    snacks={testSnacks} />);

  debug(container);

  expect(container).toContainHTML("2 different snacks");
  expect(container).toContainHTML("2 different drinks");
});