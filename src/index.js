import "./components/date.js";
import "./components/theme.js";
import "./components/todolist.js";
import "./components/water-tracker.js";
import "./components/weather.js";
import "../src/style.css";

// hot module replacement (not required)
import.meta.webpackHot.accept([
  "./index.js",
  "./components/date.js",
  "./components/theme.js",
  "./components/todolist.js",
  "./components/water-tracker.js",
  "./components/weather.js",
  "./utils/cleanup.js",
  "./utils/getId.js",
  "./utils/getLocalStorage.js",
  "./utils/isDefined.js",
]);
