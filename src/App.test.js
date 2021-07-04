import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// TODO I believe I need to mock the functions and/or Axios calls in the App
//  component's useEffects-- otherwise, the container I get from just rendering
// the App only includes the "Loading..." div since isLoading never gets 
// set to false. For the purposes of just making sure the component doesn't
// crash, this seems fine, but ideally it'd be nice to test it more thoroughly.

// TODO assess if I need to use the act() helper, per the console error.

it('mounts without crashing', function () {
  render(<MemoryRouter><App/></MemoryRouter>);
});

it("matches snapshot", function () {
  const { debug, container } = render(<MemoryRouter><App /></MemoryRouter>);
  debug(container);
  expect(container).toMatchSnapshot();
});