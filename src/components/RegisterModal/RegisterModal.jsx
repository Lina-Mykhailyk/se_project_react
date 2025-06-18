import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({ isOpen, onClose, onRegister, isLoading }) => {
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
    avatar: "",
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      resetForm({ name: "", avatar: "", email: "", password: "" }, {}, false);
      setAuthError("");
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted();
    if (!isValid) return;

    onRegister(values).catch((err) => {
      setAuthError(err.message || "Registration failed");
    });
  };

  const handleInputChange = (e) => {
    if (authError) setAuthError("");
    handleChange(e);
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="form"
      title="Sign up"
      btnText={isLoading ? "Registering..." : "Sign up"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        {(touched.email || isSubmitted) && errors.email ? (
          <span className="modal__error-text">{errors.email}</span>
        ) : (
          "Email*"
        )}
        <input
          type="email"
          name="email"
          className={`modal__input ${
            (touched.email || isSubmitted) && errors.email
              ? "modal__input_type_error"
              : ""
          }`}
          value={values.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        {(touched.password || isSubmitted) && errors.password ? (
          <span className="modal__error-text">{errors.password}</span>
        ) : (
          "Password*"
        )}
        <input
          type="password"
          name="password"
          className={`modal__input ${
            (touched.password || isSubmitted) && errors.password
              ? "modal__input_type_error"
              : ""
          }`}
          value={values.password}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Password"
          required
        />
      </label>

      <label className="modal__label">
        {(touched.name || isSubmitted) && errors.name ? (
          <span className="modal__error-text">{errors.name}</span>
        ) : (
          "Name*"
        )}
        <input
          type="text"
          name="name"
          className={`modal__input ${
            (touched.name || isSubmitted) && errors.name
              ? "modal__input_type_error"
              : ""
          }`}
          value={values.name}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        {(touched.avatar || isSubmitted) && errors.avatar ? (
          <span className="modal__error-text">{errors.avatar}</span>
        ) : (
          "Avatar URL*"
        )}
        <input
          type="url"
          name="avatar"
          className={`modal__input ${
            (touched.avatar || isSubmitted) && errors.avatar
              ? "modal__input_type_error"
              : ""
          }`}
          value={values.avatar}
          onChange={handleInputChange}
          onBlur={handleBlur}
          placeholder="Avatar URL"
          required
        />
      </label>

      {authError && <span className="modal__server-error">{authError}</span>}
    </ModalWithForm>
  );
};

export default RegisterModal;
