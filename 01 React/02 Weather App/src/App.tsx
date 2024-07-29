import { WeatherApp } from "./components/WeatherApp";
import "./components/assets/WeatherApp.css";
import { Parent } from "./Parent";
export const App = () => {
  return (
    <div>
      <WeatherApp />
      <Parent />
    </div>
  );
};
