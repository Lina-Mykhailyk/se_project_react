import { useContext, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);
  const [imgError, setImgError] = useState(false);

  const getInitial = (name) => name?.[0]?.toUpperCase() || "?";

  return (
    <div className="sidebar">
      <div className="sidebar__profile">
        {!imgError && currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={currentUser.name}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {getInitial(currentUser?.name)}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>
      <div className="sidebar__buttons">
        <button className="sidebar__button" onClick={onEditProfile}>
          Change profile data
        </button>

        <button className="sidebar__button" onClick={onLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SideBar;
