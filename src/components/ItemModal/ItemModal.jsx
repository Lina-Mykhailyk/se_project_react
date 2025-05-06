import "./ItemModal.css";

function ItemModal({ isOpen, onClose, card }) {
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
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-btn modal__close-btn_type_image"
        ></button>
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__description">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
