import React, { useContext, useEffect, useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";
import "./EditProfileModal.css";

function EditProfileModal({
  isOpen,
  onClose,
  onUpdateUser,
  isLoading,
  serverError,
}) {
  const currentUser = useContext(CurrentUserContext);

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
  });

  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm(
        {
          name: currentUser.name || "",
          avatar: currentUser.avatar || "",
        },
        {},
        true
      );
      setFormError("");
    }
  }, [isOpen, currentUser, resetForm]);

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

    onUpdateUser({
      name: values.name.trim(),
      avatar: values.avatar.trim(),
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      name="form"
      title="Change profile data"
      btnText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isValid}
      submitBtnClassName="modal__submit-btn_type_edit-profile"
    >
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
          required
          placeholder="Name"
          minLength={1}
          maxLength={30}
        />
      </label>

      <label className="modal__label">
        {(touched.avatar || isSubmitted) && errors.avatar ? (
          <span className="modal__error-text">{errors.avatar}</span>
        ) : (
          "Avatar*"
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
          placeholder="https://example.com/avatar.png"
          required
        />
      </label>

      {formError && <span className="modal__server-error">{formError}</span>}
    </ModalWithForm>
  );
}

export default EditProfileModal;
