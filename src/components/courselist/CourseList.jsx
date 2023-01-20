import { useEffect, useState, useContext, useRef } from "react";
import Modal from "../ui/Modal";
import WCContext from "../wc_context.js";

function CourseList() {
  const context = useContext(WCContext);
  const courseRef = useRef({});
  const addingCourse = useRef(false);
  //input refs
  const numberInputRef = useRef();
  const titleInputRef = useRef();
  const dateInputRef = useRef();
  const descriptionInputRef = useRef();
  const weekinputRef = useRef();

  const toggleDetails = (e) => {
    addingCourse.current = false;
    const id = e.target.parentElement.parentElement.id;
    courseRef.current = context.courseList[id - 1];
    context.toggleModal();
  };
  const toggleAddCourse = () => {
    addingCourse.current = true;
    context.toggleModal();
  };

  const addCourse = (e) => {
    e.preventDefault();
    const body = {
      courseNumber: numberInputRef.current.value,
      courseTitle: titleInputRef.current.value,
      weeks: weekinputRef.current.value,
      startDate: dateInputRef.current.value,
      description: descriptionInputRef.current.value,
    };
    console.log(JSON.stringify(body));
    context.postData("http://localhost:3010/courses", body);
    context.fetchCourses();
    context.toggleModal();
  };

  return (
    <>
      <section data-testid="course-list-component">
        {context.isLoggedIn ? (
          <h2>Courses</h2>
        ) : (
          <h2>Our selection of Courses</h2>
        )}
        <ul>
          {context.courseList.map((c) => {
            return (
              <li className="listItem" id={c.id} key={c.id}>
                <div>
                  <h3>{c.courseTitle}</h3>
                  <p>Course number: {c.courseNumber}</p>
                </div>
                <div>
                  <button className="btn" onClick={(e) => toggleDetails(e)}>
                    Details
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
        {context.isLoggedIn && (
          <button className="btn" onClick={toggleAddCourse}>Add Course</button>
        )}
      </section>
      {context.showModal && (
        <Modal
          setShowModal={context.toggleModal}
          title={
            addingCourse.current
              ? "Register new Course"
              : courseRef.current.courseTitle
          }
        >
          {addingCourse.current ? (
            <>
              <form onSubmit={addCourse}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Title of course"
                  id="name"
                  ref={titleInputRef}
                  required
                />
                <label htmlFor="courseNumber">Course number:</label>
                <input
                  type="text"
                  id="courseNumber"
                  ref={numberInputRef}
                  required
                />
                <label htmlFor="weeks">Duration:</label>
                <input type="number" id="weeks" ref={weekinputRef} required />
                <label htmlFor="startDate">Start date:</label>
                <input type="date" id="startDate" ref={dateInputRef} required />
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  required
                  ref={descriptionInputRef}
                  placeholder="Add a short description of the course content"
                />
                <button className="btn submit">Add</button>
              </form>
            </>
          ) : (
            <>
              <p>Course number: {courseRef.current.courseNumber}</p>
              <p>Duration: {courseRef.current.weeks}</p>
              <p>Start date: {courseRef.current.startDate}</p>
              <p>Description:{courseRef.current.description}</p>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default CourseList;
