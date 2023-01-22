import { render, screen, fireEvent } from "@testing-library/react";
import CourseList from "./CourseList";
//import { setupServer } from "msw/node";
import { BrowserRouter } from "react-router-dom";
//import { rest } from "msw";
import { WCContextProvider } from "../wc_context";

describe("datafetching and display of course data w <WCContextProvider>", () => {
  test("provides expected WCContext obj to child elements using jest mockdata", async () => {
    const fetchCourses = jest.fn();

    render(
      <WCContextProvider value={{ fetchCourses }}>
        <CourseList />
      </WCContextProvider>,
      { wrapper: BrowserRouter }
    );

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [
        {
          id: 2,
          courseNumber: "C01",
          courseTitle: "How to brush your teeth",
          weeks: 12,
          startDate: "2023-03-10",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
      ],
    });

    const courses = await screen.findAllByRole("listitem");

    expect(courses).not.toHaveLength(0);
  });

  // test("same style data rendering using MSW", async () => {
  //   const fetchCourses = jest.fn()

  //   render(
  //     <WCContextProvider value={{fetchCourses}}>
  //       <CourseList/>
  //     </WCContextProvider>,
  //      {wrapper: BrowserRouter}
  //   )
  //   const server = setupServer(
  //     rest.get("http://localhost:3010/courses", (req, res, context) => {
  //       return res(
  //         context.json([
  //           {
  //             id: 2,
  //             courseNumber: "C01",
  //             courseTitle: "How to brush your teeth",
  //             weeks: 12,
  //             startDate: "2023-03-10",
  //             description:
  //               "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //           },
  //         ])
  //       );
  //     })
  //   );
  //   server.listen();
  //   const listItems = await screen.findAllByRole("listitem");
  //   expect(listItems).not.toHaveLength(0);
  // });



  // Testing portals is too difficult man
  //   test('posting data from form', async ()=>{
  //     setup();
  //     let requestBody;
  //     const server = setupServer(
  //         rest.post("http://localhost:3010/courses", (req, res, context) => {
  //           req.json().then((data) => (requestBody = data));
  //           return res(context.status(201));
  //         })
  //       );
  //       server.listen();

  //         const addBtn = screen.getByText(/Add Course/i)
  //         fireEvent.click(addBtn)
  //         await new Promise((resolve) => setTimeout(resolve, 500));
  //      const form = screen.getByRole('form')
  //      expect(form).toBeInTheDocument();
  //       const numberInput = screen.getByLabelText(/Course number:/i);
  //     const titleInput = screen.getByLabelText(/Name:/i);
  //     const dateInput = screen.getByLabelText("Start date:");
  //     const descriptionInput = screen.getByLabelText("Description:");
  //     const weekinput = screen.getByDisplayValue("Duration:");
  //     const submitBtn = screen.getByDisplayValue("Add");

  //     userEvent.type(numberInput, "M03");
  //     userEvent.type(titleInput, "MockTitle");
  //     userEvent.type(dateInput, "2023-01-30");
  //     userEvent.type(weekinput, "10");
  //     userEvent.type(descriptionInput, "beskrivning");
  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     fireEvent.click(submitBtn);

  //     await new Promise((resolve) => setTimeout(resolve, 500));

  //     expect(requestBody).toEqual({
  //         courseNumber: "M03",
  //         courseTitle: "MockTitle",
  //         weeks: "n10",
  //         startDate: "2023-01-30",
  //         description: "beskrivning"
  //       });

  //     server.close();
  //   })
});
