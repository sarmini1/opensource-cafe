import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import NewItemForm from "./NewItemForm";
import { addItem } from "./App";

it('mounts without crashing', function () {
  render(<MemoryRouter><NewItemForm addItem={addItem} /></MemoryRouter>);
});

it("matches snapshot", function () {
  const { debug, container } = render(
    <MemoryRouter><NewItemForm addItem={addItem} /></MemoryRouter>
  );

  debug(container);
  expect(container).toMatchSnapshot();
});

it("displays a form to add a new item", function () {
  const { debug, container } = render(
    <MemoryRouter><NewItemForm addItem={addItem} /></MemoryRouter>
  );

  debug(container);
  const form = container.querySelector(".NewItemForm-form");
  expect(form).toBeInTheDocument();
});