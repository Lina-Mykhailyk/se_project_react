import { Link } from "react-router-dom";
import { useContext } from "react";
import "./Header.css";
import logo from "../../assets/logo.svg";
import avatarDefault from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  onAddClick,
  weatherData,
  isLoggedIn,
  onSignUpClick,
  onSignInClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="logo" className="header__logo" />
      </Link>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button onClick={onAddClick} className="header__add-clothes-btn">
            + Add clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {currentUser?.name?.[0]?.toUpperCase() || "?"}
                </div>
              )}
            </div>
          </Link>
        </>
      ) : (
        <div className="header__auth-buttons">
          <button className="header__auth-btn" onClick={onSignUpClick}>
            Sign up
          </button>
          <button className="header__auth-btn" onClick={onSignInClick}>
            Sign in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
