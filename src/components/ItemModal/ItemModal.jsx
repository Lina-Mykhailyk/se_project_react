import { useContext } from "react";
import Modal from "../Modal/Modal";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, card, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);

  const handleDeleteClick = () => {
    openConfirmationModal(card);
  };

  if (!card) return null;

  const isOwn = card.owner === currentUser?._id;

  return (
    <Modal name="image" isOpen={isOpen} onClose={onClose}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__caption">
        <div>
          <h2 className="modal__card-name">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
        {isOwn && (
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete-btn"
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
