import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
import "./AddItemModal.css";

const AddItemModal = ({
  isOpen,
  onAddItem,
  onCloseModal,
  isLoading,
  serverError,
}) => {
  const {
    values,
    errors,
    isValid,
    touched,
    isSubmitted,
    handleChange,
    handleBlur,
    resetForm,
    setFormSubmitted,
  } = useForm({
    name: "",
    imageUrl: "",
    weather: "hot",
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      resetForm({ name: "", imageUrl: "", weather: "hot" }, {}, false);
      setFormError("");
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    setFormError(serverError || "");
  }, [serverError]);

  const handleInputChange = (e) => {
    if (formError) setFormError("");
    handleChange(e);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted();
    if (!isValid) return;
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
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="name" className="modal__label">
        {(touched.name || isSubmitted) && errors.name ? (
          <span className="modal__error-text">{errors.name}</span>
        ) : (
          "Name"
        )}
        <input
          type="text"
          className={`modal__input ${
            (touched.name || isSubmitted) && errors.name
              ? "modal__input_type_error"
              : ""
          }`}
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
          minLength="1"
          maxLength="30"
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        {(touched.imageUrl || isSubmitted) && errors.imageUrl ? (
          <span className="modal__error-text">{errors.imageUrl}</span>
        ) : (
          "Image URL"
        )}
        <input
          type="url"
          className={`modal__input ${
            (touched.imageUrl || isSubmitted) && errors.imageUrl
              ? "modal__input_type_error"
              : ""
          }`}
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleInputChange}
          onBlur={handleBlur}
          required
        />
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
              onChange={handleInputChange}
              required
            />
            <span>{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </label>
        ))}
      </div>

      {formError && <span className="modal__server-error">{formError}</span>}
    </ModalWithForm>
  );
};

export default AddItemModal;
