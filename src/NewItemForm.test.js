import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { act } from 'react-dom/test-utils';


import NewItemForm from "./NewItemForm";

const addItemTest = () => { };

it('mounts without crashing', function () {
  render(<MemoryRouter><NewItemForm addItem={addItemTest} /></MemoryRouter>);
});

it("matches snapshot", function () {
  const { debug, container } = render(
    <MemoryRouter><NewItemForm addItem={addItemTest} /></MemoryRouter>
  );

  debug(container);
  expect(container).toMatchSnapshot();
});

it("displays a form to add a new item", function () {
  const { container } = render(
    <MemoryRouter><NewItemForm addItem={addItemTest} /></MemoryRouter>
  );

  const form = container.querySelector(".NewItemForm-form");
  expect(form).toBeInTheDocument();
  expect(form).toContainHTML('<label for="NewItemForm-type">Type of Item:</label>');
});

it("displays user input as it changes", function () {
  const { container } = render(
    <MemoryRouter><NewItemForm addItem={addItemTest} /></MemoryRouter>
  );

  const form = container.querySelector(".NewItemForm-form");
  const nameInput = container.querySelector("#NewItemForm-name");
  const recipeInput = container.querySelector("#NewItemForm-recipe");

  fireEvent.input(nameInput, { target: { value: 'test name input change' } });

  expect(form).toContainHTML('test name input change');

  fireEvent.input(recipeInput, { target: { value: 'test recipe input change' } });

  expect(form).toContainHTML('test recipe input change');

});

// it("submits successfully with valid inputs", function () {
//   const { debug, container } = render(
//     <MemoryRouter><NewItemForm addItem={addItemTest} /></MemoryRouter>
//   );

//   const form = container.querySelector(".NewItemForm-form");

//   const typeInput = container.querySelector(".NewItemForm-type");
//   const nameInput = container.querySelector("#NewItemForm-name");
//   const recipeInput = container.querySelector("#NewItemForm-recipe");
//   const descriptionInput = container.querySelector("#NewItemForm-description");
//   const servingInsInput = container.querySelector("#NewItemForm-serving-instructions");

//   // debug(container);
//   // console.log(typeInput);
//   fireEvent.change(typeInput, { target: { value: 'snack' } });
//   fireEvent.input(nameInput, { target: { value: 'test name input change' } });
//   fireEvent.input(recipeInput, { target: { value: 'test recipe input change' } });
//   fireEvent.input(descriptionInput, { target: { value: 'test description input change' } });
//   fireEvent.input(servingInsInput, { target: { value: 'test serving ins input change' } });


//   act(() => {
//     /* fire events that update state */
//     fireEvent.submit(form);
//   });

  // expect(addItemTest).toBeCalledTimes(1);
  // expect(form).toContainHTML('test name input change');


  // expect(form).toContainHTML('test recipe input change');

// });


