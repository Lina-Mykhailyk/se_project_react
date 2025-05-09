import React, { useContext } from "react";
import "./ToggleSwitch.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );
  const isChecked = currentTemperatureUnit === "F";

  return (
    <div className="toggle-switch">
      <label className="toggle-switch__label">
        <input
          type="checkbox"
          className="toggle-switch__checkbox"
          checked={isChecked}
          onChange={handleToggleSwitchChange}
        />
        <span className="toggle-switch__slider">
          <span className="toggle-switch__temp toggle-switch__temp_c">C</span>
          <span className="toggle-switch__temp toggle-switch__temp_f">F</span>
          <span className="toggle-switch__circle"></span>
        </span>
      </label>
    </div>
  );
}
