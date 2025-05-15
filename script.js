document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  // Noņem burkānu no punktu joslas ikonas
  progressIcon.innerHTML = "";
  progressIcon.style.backgroundImage = "none";

  // Fona mūzika
  const backgroundMusic = new Audio('speles_skana.mp3');
  backgroundMusic.volume = 0.4;
  backgroundMusic.loop = true;

  // Atskaņo mūziku uzreiz
  window.addEventListener("load", () => {
    backgroundMusic.play().catch(error => {
      console.log("Mūzika nevarēja sākt skanēt automātiski:", error);
    });
  });

  let soundEnabled = true;

  // Skaņas poga
  const muteButton = document.createElement("button");
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

  let currentTrashIndex = 0;
  let score = 0;
  const trashItems = [
    { src: "partika1.png", type: "m1" },
    { src: "partika2.png", type: "m1" },
    { src: "partika3.png", type: "m1" },
    { src: "stikls1.png", type: "m2" },
    { src: "stikls2.png", type: "m2" },
    { src: "stikls3.png", type: "m2" },
    { src: "metals1.png", type: "m3" },
    { src: "metals2.png", type: "m3" },
    { src: "metals3.png", type: "m3" },
    { src: "plast1.png", type: "m4" },
    { src: "plast2.png", type: "m4" },
    { src: "plast3.png", type: "m4" },
    { src: "papirs1.png", type: "m5" },
    { src: "papirs2.png", type: "m5" },
    { src: "papirs3.png", type: "m5" },
    { src: "bat1.png", type: "m6" },
    { src: "bat2.png", type: "m6" },
    { src: "bat3.png", type: "m6" }
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
    trashHolder.innerHTML = "";

    if (currentTrashIndex >= trashItems.length) {
      trashHolder.innerHTML = `
        <div class="final-message">
          <h1>🎉 Visi atkritumi sašķiroti!</h1>
          <p>Tu ieguvi <span class="big-score">${score}</span> punktus no <span class="big-score">${trashItems.length}</span>.</p>
        </div>
      `;
      return;
    }

    const trash = trashItems[currentTrashIndex];
    const img = document.createElement("img");
    img.src = trash.src;
    img.className = "trash-item";
    img.setAttribute("data-type", trash.type);
    img.draggable = false;
    trashHolder.appendChild(img);

    img.addEventListener("mousedown", startDrag);
    img.addEventListener("touchstart", startDrag, { passive: false });
  }

  function startDrag(e) {
    e.preventDefault();
    const draggedItem = e.target;
    draggedItem.style.opacity = "0.7";

    function onDragMove(e) {
      const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;
      draggedItem.style.position = "absolute";
      draggedItem.style.left = `${clientX - draggedItem.width / 2}px`;
      draggedItem.style.top = `${clientY - draggedItem.height / 2}px`;
    }

    function onDragEnd() {
      const trashType = draggedItem.getAttribute("data-type");
      let matched = false;

      bins.forEach(bin => {
        const binType = bin.getAttribute("src").replace(".png", "");
        const binRect = bin.getBoundingClientRect();
        const itemRect = draggedItem.getBoundingClientRect();

        if (
          itemRect.left < binRect.right &&
          itemRect.right > binRect.left &&
          itemRect.top < binRect.bottom &&
          itemRect.bottom > binRect.top &&
          trashType === binType
        ) {
          matched = true;
        }
      });

      if (matched) {
        score++;
        scoreDisplay.textContent = score;
        currentTrashIndex++;
        draggedItem.remove();
        loadNextTrash();
      } else {
        draggedItem.style.left = "50%";
        draggedItem.style.top = "50%";
        draggedItem.style.transform = "translate(-50%, -50%)";
        draggedItem.style.opacity = "1";
      }

      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchmove", onDragMove);
      document.removeEventListener("touchend", onDragEnd);
    }

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", onDragEnd);
    document.addEventListener("touchmove", onDragMove);
    document.addEventListener("touchend", onDragEnd);
  }
});
