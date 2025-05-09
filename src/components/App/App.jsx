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
import { getItems, addItem, deleteItem } from "../../utils/api";

import { getCurrentWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

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
  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = ({ name, weather, imageUrl }) => {
    addItem({ name, weather, imageUrl })
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        handleCloseClick();
      })
      .catch(console.error);
  };

  const handleCardDelete = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        handleCloseClick();
      })
      .catch(console.error);
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
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleCloseClick();
      }
    };
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__wrapper">
          <Header onAddClick={handleAddClick} weatherData={weatherData} />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <AddItemModal
          isOpen={activeModal === "add-clothes"}
          onAddItem={handleAddItemSubmit}
          onCloseModal={handleCloseClick}
        />

        <ItemModal
          isOpen={activeModal === "preview-card"}
          card={selectedCard}
          onClose={handleCloseClick}
          openConfirmationModal={(card) => {
            setCardToDelete(card);
            setActiveModal("confirm-delete");
          }}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={() => {
            setActiveModal("preview-card");
          }}
          onConfirm={() => {
            handleCardDelete(cardToDelete);
            setCardToDelete(null);
          }}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
