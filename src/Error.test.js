import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import Error from "./Error";

it('mounts without crashing', function () {
  render(<MemoryRouter><Error error={"test error"}/></MemoryRouter>);
});

it("matches snapshot", function () {
  const { container } = render(
    <MemoryRouter><Error error={"test error"}/></MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});

it("displays Error component with appropriate HTML", function () {
  const { debug, container } = render(
    <MemoryRouter><Error error={"test error"}/></MemoryRouter>
  );

  debug(container);
  const error = container.querySelector(".Error");
  expect(error).toContainHTML(
    '<h3>An error occurred:</h3>'
  )
  expect(error).toContainHTML(
    'test error'
  )
});