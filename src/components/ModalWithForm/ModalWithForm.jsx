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
}) {
  return (
    <Modal name={name} isOpen={isOpen} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form className="modal__form" onSubmit={onSubmit}>
        {children}
        <button type="submit" className="modal__submit-btn">
          {btnText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
