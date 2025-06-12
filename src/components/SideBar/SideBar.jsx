import { useContext } from "react";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar() {
  const currentUser = useContext(CurrentUserContext);

  const displayAvatar = currentUser?.avatar || "";
  const displayName = currentUser?.name || "";

  const avatarElement = displayAvatar ? (
    <img
      className="sidebar__avatar"
      src={displayAvatar}
      alt={`${displayName}'s avatar`}
    />
  ) : (
    <div className="sidebar__avatar sidebar__avatar_placeholder">
      {displayName ? displayName.charAt(0).toUpperCase() : "?"}
    </div>
  );

  return (
    <div className="sidebar">
      {avatarElement}
      <p className="sidebar__username">{displayName}</p>
    </div>
  );
}

export default SideBar;
