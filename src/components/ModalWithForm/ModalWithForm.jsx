import Modal from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  btnText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isSubmitDisabled,
  submitBtnClassName = "",
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit} noValidate>
        {children}
        <button
          type="submit"
          className={`modal__submit-btn ${
            isSubmitDisabled ? "modal__submit-btn_disabled" : ""
          } ${submitBtnClassName}`}
          disabled={isSubmitDisabled}
        >
          {btnText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
