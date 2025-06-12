import React, { useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, isLoading }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (!isOpen) {
      setValues({ name: "", imageUrl: "", weather: "" });
    }
  }, [isOpen, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="form"
      title="New garment"
      btnText={isLoading ? "Saving..." : "Add garment"}
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
          value={values.name}
          onChange={handleChange}
          required
          minLength="1"
          maxLength="30"
          aria-describedby="name-error"
        />
        <span className="modal__error" id="name-error"></span>
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
          required
          aria-describedby="url-error"
        />
        <span className="modal__error" id="url-error"></span>
      </label>

      <div className="modal__radio-btns">
        <p className="modal__legend">Select the weather type:</p>
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
              checked={values.weather === type}
              onChange={handleChange}
              required
            />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
