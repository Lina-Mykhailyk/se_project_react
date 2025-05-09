import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
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
      <div className="modal__content modal__content_type_confirm">
        <button
          type="button"
          className="modal__close-btn modal__close-btn_type_confirm"
          onClick={onClose}
        ></button>
        <p className="modal__question">
          Are you sure you want to delete this item?
          <br /> This action is irreversible.
        </p>
        <button
          type="button"
          className="modal__confirm-btn"
          onClick={onConfirm}
        >
          Yes, delete it
        </button>
        <button type="button" className="modal__cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
