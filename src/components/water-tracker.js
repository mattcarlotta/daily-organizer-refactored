document.querySelectorAll(".bottle").forEach((bottle) => {
  // toggle the class 'empty' when the bottle is clicked
  bottle.addEventListener("click", () => {
    const bottleCount = document.querySelector(".bottle-count");
    const isPressed = bottle.classList.contains("empty");

    if (!isPressed) bottle.classList.add("empty");
    else bottle.classList.remove("empty");

    // since this is a non-traditional toggle button, we should update the aria pressed
    // attribute to notify the user that it has changed
    bottle.setAttribute("aria-pressed", isPressed);

    // grab the empty bottles length and display it
    const emptyBottles = document.getElementsByClassName("empty").length;
    bottleCount.innerText = `${emptyBottles} / 8 Bottles of Water Drank Today!`;
  });
});

// hot module replacement (not required)
import.meta.webpackHot.accept();
import.meta.webpackHot.dispose(() => {
  // iterate over the bottles...
  document.querySelectorAll(".bottle").forEach((oldBottle) => {
    // clone the old node and replace with the new node (to remove event listeners)
    const newBottle = oldBottle.cloneNode(true);
    oldBottle.parentNode.replaceChild(newBottle, oldBottle);
  });
});
