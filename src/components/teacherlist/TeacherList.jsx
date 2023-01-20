import { useEffect, useState, useContext, useRef } from "react";
import Modal from "../ui/Modal";
import WCContext from "../wc_context.js";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const context = useContext(WCContext);
  const teacherRef = useRef({});
  const addingTeacher = useRef(false);
  //Input refs
  const SNSInputRef = useRef();
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const telInputRef = useRef();
  const qualificationInputRef = useRef();

  useEffect(() => {
    context.auth();
  }, [context.isLoggedIn]);

  //get teacher array
  useEffect(() => {
    console.log("fetching teachers");
    loadTeachers();
  }, []);

  const loadTeachers = () => {
    fetch("http://localhost:3010/teachers")
      .then((response) => response.json())
      .then((data) => setTeachers(data));
  };

  const toggleDetails = (e) => {
    addingTeacher.current = false;
    console.log(e.target.parentElement.parentElement.id)
    const id = e.target.parentElement.parentElement.id;
    teacherRef.current = teachers[id - 1];
    context.toggleModal();
  };

  const toggleAddTeacher = () => {
    addingTeacher.current = true;
    context.toggleModal();
  };

  const addTeacher = (e) => {
    e.preventDefault();
    const qualifications = qualificationInputRef.current.value.split(', ')
    const body = {
      SNS: SNSInputRef.current.value,
      fullName: nameInputRef.current.value,
      email: emailInputRef.current.value,
      mobileNumber: telInputRef.current.value,
      qualifications: qualifications,
    };
    console.log(JSON.stringify(body));
    context.postData("http://localhost:3010/teachers", body);
    loadTeachers();
    context.toggleModal();
  };

  return (
    <>
      <section data-testid="teacher-list-component">
        <h2>Teachers</h2>
        <ul className="">
          {teachers.map((teacher) => (
            <li className="listItem" id={teacher.id} key={teacher.id}>
              <div>
                <h3>{teacher.fullName}</h3>
                <p>Email: {teacher.email}</p>
              </div>
              <div>
                <button className="btn" onClick={(e) => toggleDetails(e)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
        <button className="btn" onClick={toggleAddTeacher}>Add new Teacher</button>
      </section>
      {context.showModal && (
        <Modal
          setShowModal={context.toggleModal}
          title={
            addingTeacher.current
              ? "Register new Teacher"
              : teacherRef.current.fullName
          }
        >
          {addingTeacher.current ? (
            <>
              <form onSubmit={addTeacher}>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Teacher Full Name"
                  id="name"
                  ref={nameInputRef}
                  required
                />
                <label htmlFor="SNS">Social Security number</label>
                <input type="text" id="SNS" required ref={SNSInputRef} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" required ref={emailInputRef} />
                <label htmlFor="mobilenumber">Mobile number:</label>
                <input
                  type="tel"
                  id="mobilenumber"
                  ref={telInputRef}
                  required
                />
                <label htmlFor="qualifications">
                  Qualifications: (reparate using ",")
                </label>
                <input type="text" ref={qualificationInputRef} />
                <button className="btn submit">Add</button>
              </form>
            </>
          ) : (
            <>
              <p>
                <b>Social Security Number:</b> {teacherRef.current.SNS}
              </p>
              <p>
                <b>Email:</b> {teacherRef.current.email}
              </p>
              <p>
                <b>Mobile number:</b> {teacherRef.current.mobileNumber}
              </p>
              <p>
                <b>Qualifications:</b>
              </p>
              <ol>
                {teacherRef.current.qualifications.map((q, i) => {
                  return <li key={i}>{q}</li>;
                })}
              </ol>
            </>
          )}
        </Modal>
      )}
    </>
  );
}

export default TeacherList;
