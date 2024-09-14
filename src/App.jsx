import logo from "./logo.svg";
import "./App.css";
import { createSignal, Show } from "solid-js";
import getWeatherDetails from "./component/apiService";

function App() {
  const [query, setQuery] = createSignal("");
  const [weather, setWeather] = createSignal({});
  const [loading, setLoading] = createSignal(false);

  const getCityWeather = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await getWeatherDetails(query());
        setLoading(true);
        setWeather(response);
        setQuery("");
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    console.log(weather());
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query()}
        onChange={(e) => setQuery(e.target.value)}
        onKeyUp={getCityWeather}
      />
      <Show when={loading()}>
        <div class="loading">Loading...</div>
      </Show>
      <Show when={!loading()}>
        {" "}
        {weather().main && (
          <div class="city">
            <div className="city-name">
              <span>{weather().name}</span>
              <sup>{weather().sys.country}</sup>
            </div>
            <div className="city-temp">
              {Math.round(weather().main.temp)}
              <sup>&deg;c</sup>
            </div>
            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${
                  weather().weather[0].icon
                }@2x.png`}
                alt={weather().weather[0].description}
              />
              <p>{weather().weather[0].description}</p>
            </div>
          </div>
        )}
      </Show>
    </div>
  );
}

export default App;
