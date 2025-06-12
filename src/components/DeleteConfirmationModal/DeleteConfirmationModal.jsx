import Modal from "../Modal/Modal";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, isLoading }) {
  return (
    <Modal name="confirm" isOpen={isOpen} onClose={onClose}>
      <p className="modal__question">
        Are you sure you want to delete this item?
        <br /> This action is irreversible.
      </p>
      <div className="modal__actions">
        <button
          type="button"
          className="modal__confirm-btn"
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Deleting..." : "Yes, delete it"}
        </button>
        <button
          type="button"
          className="modal__cancel-btn"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
