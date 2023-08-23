import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import SnackOrBoozeApi from './Api';
import App from "./App";
import { testDrinks, testSnacks } from './testingSeed/fakeData';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  // console.log(document);
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// jest.mock("./Api", () => ({ getItems: jest.fn() }))
// SnackOrBoozeApi.getItems.mockImplementation(() => Promise.resolve(testSnacks))

it("renders without crashing", async function () {
  await act(async () => {
    render(<App />, container);
  });
}
);

it("matches snapshot", async function () {
  await act(async () => {
    render(<App />, container);
  });

  expect(container).toMatchSnapshot();
});

it("renders menu data", async () => {
  const mockGetItems =
    jest
      .spyOn(SnackOrBoozeApi, "getItems")
      .mockImplementationOnce(() => Promise.resolve(testSnacks))
      .mockImplementationOnce(() => Promise.resolve(testDrinks));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });

  expect(mockGetItems.mock.calls.length).toEqual(2);
  expect(container).toContainHTML('Now offering a selection of 2 different snacks and 2 different drinks!');

  // remove the mock to ensure tests are completely isolated
  SnackOrBoozeApi.getItems.mockRestore();
});

it("handles errors when fetching data from api", async () => {
  const mockGetItems =
    jest
      .spyOn(SnackOrBoozeApi, "getItems")
      .mockImplementationOnce(() => Promise.reject("Location: nope.com, status: nope status"))
      .mockImplementationOnce(() => Promise.reject("Location: nope.com, status: nope status"));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<App />, container);
  });
  screen.debug(container);

  const error = container.querySelector(".Error");

  expect(mockGetItems.mock.calls.length).toEqual(2);
  expect(container).not.toContainHTML("Welcome to Silicon Valley's premier dive cafe");
  expect(error).toContainHTML("Location: nope.com, status: nope status");

  // // remove the mock to ensure tests are completely isolated
  SnackOrBoozeApi.getItems.mockRestore();
});