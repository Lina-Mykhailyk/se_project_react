import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signUp, signIn, checkToken } from "../../utils/auth";
import { getCurrentWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [addItemError, setAddItemError] = useState("");

  const isAddItemModalOpen = activeModal === "add-clothes";
  const isPreviewModalOpen = activeModal === "preview-card";
  const isDeleteConfirmOpen = activeModal === "confirm-delete";
  const isRegisterModalOpen = activeModal === "register";
  const isLoginModalOpen = activeModal === "login";
  const isEditProfileModalOpen = activeModal === "edit-profile";

  const handleEditProfileClick = () => setActiveModal("edit-profile");

  const handleUpdateUser = ({ name, avatar }) => {
    setIsLoading(true);
    setProfileError("");

    updateUser({ name, avatar }, localStorage.getItem("jwt"))
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseClick();
      })
      .catch((err) => {
        setProfileError(err.message || "Failed to update profile");
      })
      .finally(() => setIsLoading(false));
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview-card");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-clothes");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleSignInClick = () => {
    setActiveModal("login");
  };

  const handleCloseClick = () => {
    setActiveModal("");
    setProfileError("");
  };

  const handleAddItemSubmit = ({ name, weather, imageUrl }) => {
    setIsLoading(true);
    setAddItemError("");
    addItem({ name, weather, imageUrl }, localStorage.getItem("jwt"))
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseClick();
      })
      .catch((err) => {
        setAddItemError(
          err.message || "Failed to add item. Please check the image URL."
        );
      })
      .finally(() => setIsLoading(false));
  };

  const handleCardDelete = (cardToDelete) => {
    setIsLoading(true);
    deleteItem(cardToDelete._id, localStorage.getItem("jwt"))
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        handleCloseClick();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    setIsLoadingAuth(true);
    signUp({ name, avatar, email, password })
      .then(() => {
        handleLogin({ email, password });
      })
      .catch(console.error)
      .finally(() => setIsLoadingAuth(false));
  };

  const handleLogin = ({ email, password }) => {
    setIsLoadingAuth(true);
    return signIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            handleCloseClick();
          });
        } else {
          return Promise.reject(new Error("Token missing from response"));
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
        return Promise.reject(err);
      })
      .finally(() => setIsLoadingAuth(false));
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("User not authorized");
      return;
    }

    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Failed to update like:", err));
  };

  useEffect(() => {
    getCurrentWeather(coordinates, APIkey)
      .then((data) => {
        setWeatherData(filterWeatherData(data));
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
        })
        .finally(() => setIsAuthChecked(true));
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__wrapper">
            <Header
              onAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onSignUpClick={handleSignUpClick}
              onSignInClick={handleSignInClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    isAuthChecked={isAuthChecked}
                  >
                    <main className="main">
                      <Profile
                        onCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onAddClick={handleAddClick}
                        onEditProfile={handleEditProfileClick}
                        onLogOut={handleLogOut}
                        onCardLike={handleCardLike}
                      />
                    </main>
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={isAddItemModalOpen}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseClick}
            isLoading={isLoading}
            serverError={addItemError}
          />

          <ItemModal
            isOpen={isPreviewModalOpen}
            card={selectedCard}
            onClose={handleCloseClick}
            openConfirmationModal={(card) => {
              setCardToDelete(card);
              setActiveModal("confirm-delete");
            }}
          />

          <DeleteConfirmationModal
            isOpen={isDeleteConfirmOpen}
            onClose={() => {
              setActiveModal("preview-card");
            }}
            onConfirm={() => {
              handleCardDelete(cardToDelete);
              setCardToDelete(null);
            }}
            isLoading={isLoading}
          />

          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => {
              setProfileError("");
              handleCloseClick();
            }}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            serverError={profileError}
          />

          <RegisterModal
            isOpen={isRegisterModalOpen}
            onClose={handleCloseClick}
            onRegister={handleRegister}
            isLoading={isLoadingAuth}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={handleCloseClick}
            onLogin={handleLogin}
            isLoading={isLoadingAuth}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
