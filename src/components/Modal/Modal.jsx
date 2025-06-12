import "./Modal.css";
import useModalClose from "../../hooks/useModalClose";

function Modal({ name, isOpen, onClose, children }) {
  useModalClose(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__container modal__container_type_${name}`}>
        {children}
        <button
          className={`modal__close-btn modal__close-btn_type_${name}`}
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        />
      </div>
    </div>
  );
}

export default Modal;
