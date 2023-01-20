import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test('Title of site renders', ()=>{
  render(<App />);
  const heading = screen.getByRole('banner')
  const title = heading.getByText(/Westcoast Education/i) // i=case insensitive
  expect(title).toContain(/Westcoast Education/i);
})


describe("Test routing of app", () => {
  const setup = () => render(<App />);

    setup();
    const logInBtn = screen.getByText(/Log in/);
    fireEvent.click(logInBtn);

    test.each`
      path           | componentTestId
      ${"/"}         | ${"landing-page-component"}
      ${"/teachers"} | ${"teacher-list-component"}
      ${"/courses"}  | ${"course-list-component"}
    `(
      "display $componentTestId when path is $path",
      ({ path, componentTestId }) => {
        // Arrange
        window.history.pushState({}, "", path);
        setup();
        const elem = screen.queryByTestId(componentTestId);

        // Assert
        expect(elem).toBeInTheDocument();
      }
    );
  
});
