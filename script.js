document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  progressIcon.innerHTML = "";
  progressIcon.style.backgroundImage = "none";

  const backgroundMusic = new Audio('speles_skana.mp3');
  backgroundMusic.volume = 0.2;

  backgroundMusic.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
  }, false);

  let soundEnabled = true;

  const muteButton = document.createElement("button");
  muteButton.className = "btn mute-btn";
  muteButton.innerHTML = "🔊 Ieslēgt skaņu";
  document.querySelector(".button-wrapper").appendChild(muteButton);

  muteButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    if (soundEnabled) {
      backgroundMusic.play();
      muteButton.innerHTML = "🔇 Izslēgt skaņu";
    } else {
      backgroundMusic.pause();
      muteButton.innerHTML = "🔊 Ieslēgt skaņu";
    }
  });

  backgroundMusic.play();

  let currentTrashIndex = 0;
  let score = 0;

  const trashItems = [
    { src: "partika1.png", type: "m1" },
    { src: "partika2.png", type: "m1" },
    { src: "stikls1.png", type: "m2" },
    { src: "metals1.png", type: "m3" },
    { src: "plast1.png", type: "m4" },
    { src: "papirs1.png", type: "m5" },
    { src: "bat1.png", type: "m6" }
  ];

  shuffleArray(trashItems);
  loadNextTrash();

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function loadNextTrash() {
    if (currentTrashIndex >= trashItems.length) return;

    trashHolder.innerHTML = "";
    const trash = trashItems[currentTrashIndex];

    const img = document.createElement("img");
    img.src = trash.src;
    img.className = "trash-item";
    img.dataset.type = trash.type;
    img.draggable = true;

    img.addEventListener("dragstart", () => img.classList.add("dragging"));
    img.addEventListener("dragend", () => img.classList.remove("dragging"));

    trashHolder.appendChild(img);
  }

  bins.forEach((bin) => {
    bin.addEventListener("dragover", (e) => e.preventDefault());
    bin.addEventListener("drop", (e) => {
      const draggedItem = document.querySelector(".dragging");
      if (draggedItem && draggedItem.dataset.type === bin.dataset.type) {
        score++;
        currentTrashIndex++;
        scoreDisplay.textContent = score;
        progressFill.style.width = `${(score / trashItems.length) * 100}%`;
        loadNextTrash();
      }
    });
  });

  loadNextTrash();
});
