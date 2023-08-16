import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import NotFound from "./NotFound";

it('mounts without crashing', function () {
  render(<MemoryRouter><NotFound /></MemoryRouter>);
});

it("matches snapshot", function () {
  const { container } = render(
    <MemoryRouter><NotFound /></MemoryRouter>
  );

  expect(container).toMatchSnapshot();
});

it("displays NotFound component with appropriate HTML", function () {
  const { debug, container } = render(
    <MemoryRouter><NotFound /></MemoryRouter>
  );

  debug(container);
  const notFound = container.querySelector(".NotFound");
  expect(notFound).toContainHTML(
    '<h2>To return home, click <a href="/">here.</a></h2>'
  )
});