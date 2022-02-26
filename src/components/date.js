// updates the time and date every second
const time = setInterval(() => {
  const displayDate = document.querySelector(".date");
  const displayTime = document.querySelector(".time");

  // passes the locale and the format options for both date and time

  displayDate.textContent = new Date().toLocaleDateString("en-gb", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  displayTime.textContent = new Date().toLocaleTimeString("en-gb", {
    hour: "2-digit",
    minute: "2-digit",
  });
}, 1000);

// hot module replacement (not required)
import.meta.webpackHot.accept();
import.meta.webpackHot.dispose(() => {
  // remove interval when the module is updated...
  clearInterval(time);
});
