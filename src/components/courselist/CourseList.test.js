import { render, screen } from "@testing-library/react";
import CourseList from "./CourseList";
import { setupServer } from "msw/node";
import { rest } from "msw";

describe("datafetching and display of course data", () => {
  const setup = () => render(<CourseList />);
  test(" data rendering w MSW", async () => {
    setup();
    const server = setupServer(
      rest.get("http://localhost:3010/courses", (req, res, context) => {
        return res(
          context.json([
            {
              id: 2,
              courseNumber: "C01",
              courseTitle: "How to brush your teeth",
              weeks: 12,
              startDate: "2023-03-10",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            },
          ])
        );
      })
    );
    server.listen();
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).not.toHaveLength(0);
  });

  test('posting data from form', async ()=>{
    setup();
    let requestBody;
    const server = setupServer(
        rest.post("http://localhost:3010/courses", (req, res, context) => {
          req.json().then((data) => (requestBody = data));
          return res(context.status(201));
        })
      );
      server.listen();
      const numberInput = screen.getByLabelText("Course number:");
    const titleInput = screen.getByLabelText("Name:");
    const dateInput = screen.getByLabelText("Start date:");
    const descriptionInput = screen.getByLabelText("Description:");
    const weekinput = screen.getByDisplayValue("Duration:");
    const submitBtn = screen.getByDisplayValue("Add");

    userEvent.type(numberInput, "M03");
    userEvent.type(titleInput, "MockTitle");
    userEvent.type(dateInput, "2023-01-30");
    userEvent.type(weekinput, "10");
    userEvent.type(descriptionInput, "beskrivning");
    await new Promise((resolve) => setTimeout(resolve, 500));

    fireEvent.click(submitBtn);

    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(requestBody).toEqual({
        courseNumber: "M03",
        courseTitle: "MockTitle",
        weeks: "n10",
        startDate: "2023-01-30",
        description: "beskrivning"
      });

    server.close();
  })
  
});
