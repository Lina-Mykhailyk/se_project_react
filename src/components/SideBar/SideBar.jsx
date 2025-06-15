import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  const getInitial = (name) => name?.[0]?.toUpperCase() || "?";

  return (
    <div className="sidebar">
      {currentUser?.avatar ? (
        <img
          className="sidebar__avatar"
          src={currentUser.avatar}
          alt={currentUser.name}
        />
      ) : (
        <div className="sidebar__avatar-placeholder">
          {getInitial(currentUser?.name)}
        </div>
      )}
      <p className="sidebar__username">{currentUser?.name}</p>

      <button className="sidebar__edit-btn" onClick={onEditProfile}>
        Change profile data
      </button>

      <button className="sidebar__signout-btn" onClick={onLogOut}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
