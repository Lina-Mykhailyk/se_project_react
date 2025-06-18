import React, { useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({ isOpen, onClose, onLogin, isLoading }) => {
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
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      resetForm({ email: "", password: "" }, {}, false);
      setAuthError("");
    }
  }, [isOpen, resetForm]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted();
    if (!isValid) return;

    onLogin(values).catch((err) => {
      setAuthError(err.message || "Invalid email or password");
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
      title="Log in"
      btnText={isLoading ? "Logging in..." : "Log in"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
    >
      <label className="modal__label">
        {(touched.email || isSubmitted) && errors.email ? (
          <span className="modal__error-text">{errors.email}</span>
        ) : (
          "Email"
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
          "Password"
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
      {authError && <span className="modal__server-error">{authError}</span>}
    </ModalWithForm>
  );
};

export default LoginModal;
