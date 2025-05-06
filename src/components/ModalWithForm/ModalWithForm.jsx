import "./ModalWithForm.css";

function ModalWithForm({ children, btnText, title, isOpen, onClose }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close-btn" />
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
