const toggleButtonNode = document.getElementById("toggle");

toggleButtonNode.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
});

// hot module replacement (not required)
import.meta.webpackHot.dispose(() => {
  const { cleanup } = require("../utils/cleanup");
  cleanup(toggleButton);
});
