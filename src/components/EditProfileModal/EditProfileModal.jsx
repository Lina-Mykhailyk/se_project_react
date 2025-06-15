import { useContext, useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedAvatar = avatar.trim();

    const updateData = {
      name: trimmedName,
    };

    if (trimmedAvatar !== "") {
      updateData.avatar = trimmedAvatar;
    }

    onUpdateUser(updateData);
  };

  return (
    <Modal name="edit-profile" isOpen={isOpen} onClose={onClose}>
      <form className="modal__form" onSubmit={handleSubmit}>
        <h2 className="modal__title">Edit Profile</h2>
        <label className="modal__label">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="modal__input"
          />
        </label>
        <label className="modal__label">
          Avatar URL
          <input
            type="url"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className="modal__input"
            required
            placeholder="https://example.com/avatar.png"
          />
        </label>
        <button
          type="submit"
          className="modal__submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save"}
        </button>
      </form>
    </Modal>
  );
}

export default EditProfileModal;
