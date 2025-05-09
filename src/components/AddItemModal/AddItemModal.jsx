import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleImageUrlChange = (e) => setImageUrl(e.target.value);
  const handleWeatherChange = (e) => setWeather(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
  };

  return (
    <ModalWithForm
      title="New garment"
      btnText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
          minLength="1"
          maxLength="30"
        />
        <span className="modal__error" id="name-error"></span>
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
        />
        <span className="modal__error" id="url-error"></span>
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        {["hot", "warm", "cold"].map((type) => (
          <label
            key={type}
            htmlFor={type}
            className="modal__label modal__label_type_radio"
          >
            <input
              id={type}
              type="radio"
              className="modal__radio-input"
              name="weather"
              value={type}
              checked={weather === type}
              onChange={handleWeatherChange}
              required
            />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
