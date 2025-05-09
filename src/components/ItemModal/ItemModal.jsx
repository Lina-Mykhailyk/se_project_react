import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card, openConfirmationModal }) {
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  const handleDeleteClick = () => {
    openConfirmationModal(card);
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_image"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__caption">
          <div className="modal__description">
            <h2 className="modal__card-name">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            onClick={handleDeleteClick}
            type="button"
            className="modal__delete-btn"
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
