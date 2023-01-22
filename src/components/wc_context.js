import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WCContext = React.createContext({
  isLoggedIn: true,
  showModal: false,
  courseList: [],
  fetchCourses: ()=>{},
  auth: () => {},
  toggleLogin: () => {},
  toggleModal: () => {},
  postData: () => {},
});

export const WCContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("loggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetchCourses()
  },[]);

  const fetchCourses=  ()=>{
    try{
      fetch("http://localhost:3010/courses")
      .then((response) => response.json())
      .then((data) => setCourseList(data));
    } catch (error) {
      console.log(error);
      return;
    }
    
  }

  const authHandler = () => {
    console.log("auth");
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      navigate("/");
    }
  };

  const postData =  (url, body) => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const toggleLogInHandler = () => {
    if (isLoggedIn) {
      localStorage.removeItem("loggedIn");
    } else {
      localStorage.setItem("loggedIn", "Admin");
    }
    setIsLoggedIn((isLoggedIn) => !isLoggedIn);
    navigate("/");
  };

  const toggleModalHandler = () => {
    setShowModal((showModal) => !showModal);
  };

  return (
    <WCContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        showModal: showModal,
        auth: authHandler,
        toggleLogin: toggleLogInHandler,
        toggleModal: toggleModalHandler,
        postData: postData,
        courseList: courseList,
        fetchCourses: fetchCourses
      }}
    >
      {props.children}
    </WCContext.Provider>
  );
};

export default WCContext;
