import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import CafeMenu from "./CafeMenu";

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

  it('mounts without crashing', function () {
    render(<MemoryRouter><CafeMenu type={"snacks"} items={testSnacks} title={"Snacks"}/></MemoryRouter>);
  });
  
  it("matches snapshot", function () {
    const {debug, container} = render(<MemoryRouter><CafeMenu type="snacks" items={testSnacks} title="Snacks"/></MemoryRouter>);
    debug(container);
    expect(container).toMatchSnapshot();
  });

  it("displays a menu of items", function (){
    const {debug, container} = render(<MemoryRouter><CafeMenu type="snacks" items={testSnacks} title="Snacks"/></MemoryRouter>);

    debug(container);
    expect(container).toContainHTML("Hummus");
    expect(container).toContainHTML("Nachos");
  });