import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from "react-router-dom";

import * as fakeData from './testingSeed/fakeData';
import SnackOrBoozeApi from './Api';
import NewItemForm from "./NewItemForm";
import App from './App';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  console.log(document);
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('mounts without crashing', async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewItemForm addItem={fakeData.placeholderFunction} />
      </MemoryRouter>,
      container
    );
  });
});

it("matches snapshot", async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewItemForm addItem={fakeData.placeholderFunction} />
      </MemoryRouter>,
      container
    );
  });

  expect(container).toMatchSnapshot();
});

it("displays a form to add a new item", async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewItemForm addItem={fakeData.placeholderFunction} />
      </MemoryRouter>,
      container
    );
  });

  const form = container.querySelector(".NewItemForm-form");
  expect(form).toBeInTheDocument();
  expect(form).toContainHTML('<label for="NewItemForm-type">Type of Item:</label>');
});

it("displays shows error message if type isn't selected upon submission", async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewItemForm addItem={fakeData.placeholderFunction} />
      </MemoryRouter>,
      container
    );
  });
  const form = container.querySelector(".NewItemForm-form");

  const nameInput = container.querySelector("#NewItemForm-name");
  const recipeInput = container.querySelector("#NewItemForm-recipe");
  const descriptionInput = container.querySelector("#NewItemForm-description");
  const servingInsInput = container.querySelector("#NewItemForm-serving-instructions");

  await act(async () => {
    fireEvent.input(nameInput, { target: { value: fakeData.newSnack.name } });
    fireEvent.input(recipeInput, { target: { value: fakeData.newSnack.recipe } });
    fireEvent.input(descriptionInput, { target: { value: fakeData.newSnack.description } });
    fireEvent.input(servingInsInput, { target: { value: fakeData.newSnack.serve } });

    fireEvent.submit(form);
  });

  const error = container.querySelector(".Error");
  expect(container).toContainElement(form);
  expect(form).toContainHTML(fakeData.newSnack.name);
  expect(error).toContainHTML("Please ensure an item type is selected.");
});

it("displays user input as it changes", async function () {
  await act(async () => {
    render(
      <MemoryRouter>
        <NewItemForm addItem={fakeData.placeholderFunction} />
      </MemoryRouter>,
      container
    );
  });
  const form = container.querySelector(".NewItemForm-form");
  const nameInput = container.querySelector("#NewItemForm-name");
  const recipeInput = container.querySelector("#NewItemForm-recipe");

  fireEvent.input(nameInput, { target: { value: 'test name input change' } });

  expect(form).toContainHTML('test name input change');

  fireEvent.input(recipeInput, { target: { value: 'test recipe input change' } });

  expect(form).toContainHTML('test recipe input change');

});

it("submits new snack successfully with valid inputs", async function () {

  // mock functions called in the effect that runs after App renders
  jest
    .spyOn(SnackOrBoozeApi, "getItems")
    .mockImplementationOnce(() => Promise.resolve(fakeData.testSnacks))
    .mockImplementationOnce(() => Promise.resolve(fakeData.testDrinks));

  // mock axios call inside add item function that runs when form is submitted
  const mockAddItem =
    jest
      .spyOn(SnackOrBoozeApi, "addItem")
      .mockImplementationOnce(() => Promise.resolve(fakeData.newSnack));

  await act(async () => {
    render(<App />, container);
  });

  const newItemFormLink = container.querySelector('.NavLink-new-item');
  fireEvent.click(newItemFormLink);

  const form = container.querySelector(".NewItemForm-form");
  expect(container).toContainElement(form);

  const typeInput = container.querySelector(".NewItemForm-type");
  const nameInput = container.querySelector("#NewItemForm-name");
  const recipeInput = container.querySelector("#NewItemForm-recipe");
  const descriptionInput = container.querySelector("#NewItemForm-description");
  const servingInsInput = container.querySelector("#NewItemForm-serving-instructions");

  await act(async () => {
    fireEvent.change(typeInput, { target: { value: 'snack' } });
    fireEvent.input(nameInput, { target: { value: fakeData.newSnack.name } });
    fireEvent.input(recipeInput, { target: { value: fakeData.newSnack.recipe } });
    fireEvent.input(descriptionInput, { target: { value: fakeData.newSnack.description } });
    fireEvent.input(servingInsInput, { target: { value: fakeData.newSnack.serve } });

    fireEvent.submit(form);
  });

  expect(mockAddItem).toHaveBeenCalledTimes(1);
  expect(container).toContainHTML('Please enjoy some of our snacks listed below!');
  expect(container).toContainHTML('New Snack!');
  expect(container).not.toContainElement(form);
});

it("submits new drink successfully with valid inputs", async function () {

  // mock functions called in the effect that runs after App renders
  jest
    .spyOn(SnackOrBoozeApi, "getItems")
    .mockImplementationOnce(() => Promise.resolve(fakeData.testSnacks))
    .mockImplementationOnce(() => Promise.resolve(fakeData.testDrinks));

  // mock axios call inside add item function that runs when form is submitted
  const mockAddItem =
    jest
      .spyOn(SnackOrBoozeApi, "addItem")
      .mockImplementationOnce(() => Promise.resolve(fakeData.newDrink));

  await act(async () => {
    render(<App />, container);
  });

  const newItemFormLink = container.querySelector('.NavLink-new-item');
  fireEvent.click(newItemFormLink);

  const form = container.querySelector(".NewItemForm-form");
  expect(container).toContainElement(form);

  const typeInput = container.querySelector(".NewItemForm-type");
  const nameInput = container.querySelector("#NewItemForm-name");
  const recipeInput = container.querySelector("#NewItemForm-recipe");
  const descriptionInput = container.querySelector("#NewItemForm-description");
  const servingInsInput = container.querySelector("#NewItemForm-serving-instructions");

  await act(async () => {
    fireEvent.change(typeInput, { target: { value: 'drink' } });
    fireEvent.input(nameInput, { target: { value: fakeData.newDrink.name } });
    fireEvent.input(recipeInput, { target: { value: fakeData.newDrink.recipe } });
    fireEvent.input(descriptionInput, { target: { value: fakeData.newDrink.description } });
    fireEvent.input(servingInsInput, { target: { value: fakeData.newDrink.serve } });

    fireEvent.submit(form);
  });

  expect(mockAddItem).toHaveBeenCalledTimes(1);
  expect(container).toContainHTML('Please enjoy some of our drinks listed below!');
  expect(container).toContainHTML('New Drink!');
  expect(container).not.toContainElement(form);
});
