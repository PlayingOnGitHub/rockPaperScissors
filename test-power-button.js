function changeImage() {
    document.querySelector("img").src = "rock-paper-scissors-in-tv.png";
}

let powerButton = document.getElementById("power-button");

powerButton.addEventListener("click", changeImage, true);