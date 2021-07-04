import React from 'react';
import { render } from '@testing-library/react';
import NewItemForm from "./NewItemForm";
import { addItem } from "./App";

it('mounts without crashing', function () {
  render(<NewItemForm addItem={addItem} />)
});

it("matches snapshot", function () {
  const { debug, container } = render(<NewItemForm addItem={addItem} />)

  debug(container);
  expect(container).toMatchSnapshot();
});

it("displays a form to add a new item", function () {
  const { debug, container } = render(<NewItemForm addItem={addItem} />);

  debug(container);
  const form = container.querySelector(".NewItemForm-form");
  expect(form).toBeInTheDocument();
});