document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  progressIcon.innerHTML = "";
  progressIcon.style.backgroundImage = "none";

  const backgroundMusic = new Audio('speles_skana.mp3');
  backgroundMusic.volume = 0.4;

  backgroundMusic.loop = true;

  let soundEnabled = true;
  const muteButton = document.querySelector(".mute-btn") || document.createElement("button");
  muteButton.className = "btn mute-btn";
  muteButton.innerHTML = "🔊 Skaņa ieslēgta";
  document.querySelector(".button-wrapper").appendChild(muteButton);

  muteButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      backgroundMusic.play();
      muteButton.innerHTML = "🔊 Skaņa ieslēgta";
    } else {
      backgroundMusic.pause();
      muteButton.innerHTML = "🔇 Skaņa izslēgta";
    }
  });

  backgroundMusic.play();

  const trashItems = [
    { src: "partika1.png", type: "m1" },
    { src: "partika2.png", type: "m1" },
    { src: "stikls1.png", type: "m2" }
  ];

  let currentTrashIndex = 0;
  let score = 0;

  loadNextTrash();

  function loadNextTrash() {
    trashHolder.innerHTML = "";
    if (currentTrashIndex >= trashItems.length) return;

    const trash = trashItems[currentTrashIndex];
    const img = document.createElement("img");
    img.src = trash.src;
    img.className = "trash-item";
    img.dataset.type = trash.type;

    img.onerror = () => {
      console.error(`Image not found: ${trash.src}`);
    };

    trashHolder.appendChild(img);
    currentTrashIndex++;
  }

});
