import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

function Overlay(props) {
  return <div className={classes.overlay} onClick={props.onClose}></div>;
}

function ModalContent(props) {
  return (
    <div className={classes.modalWrapper}>
      <header className={classes.header}>
        <h1>{props.title}</h1>
        <div className={classes.exit} onClick={props.onClose}><b>X</b></div>
      </header>
      <main className={classes.modalcontent}>{props.children}</main>
      <footer className={classes.footer}>
        <button className="btn" onClick={props.onClose}>
          Close
        </button>
      </footer>
    </div>
  );
}

function Modal(props) {
  const onClose = () => {
    props.setShowModal(false);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Overlay onClose={onClose} />,
        document.getElementById("overlay-root")
      )}
      {ReactDOM.createPortal(
        <ModalContent {...props} onClose={onClose}>
          {props.children}
        </ModalContent>,
        document.getElementById("modal-root")
      )}
    </>
  );
}

export default Modal;
