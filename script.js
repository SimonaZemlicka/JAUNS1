document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  // Noņem burkānu no punktu joslas ikonas
  progressIcon.innerHTML = "";
  progressIcon.style.backgroundImage = "none";

  // Fona mūzika (tikai fonā, neietekmē spēli)
  const backgroundMusic = new Audio('speles_skana.mp3');
  backgroundMusic.volume = 0.4;
  backgroundMusic.loop = true;
  backgroundMusic.play().catch((error) => {
    console.log("Skaņa nevar sākt skanēt automātiski:", error);
  });

  let soundEnabled = true;
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
    { src: "bat3.png", type: "m6" },
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
    img.style.position = "fixed";
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%)";

    trashHolder.appendChild(img);

    img.addEventListener("mousedown", startDrag);
    img.addEventListener("touchstart", startDrag, { passive: false });
  }

  function startDrag(e) {
    e.preventDefault();
    draggedOriginal = e.target;
    startLeft = draggedOriginal.style.left;
    startTop = draggedOriginal.style.top;

    draggedOriginal.style.opacity = "0.5";
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", dragMove, { passive: false });
    document.addEventListener("touchend", endDrag);
  }

  function dragMove(e) {
    e.preventDefault();
    const clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    const clientY = e.type.startsWith("touch") ? e.touches[0].clientY : e.clientY;

    draggedOriginal.style.left = `${clientX}px`;
    draggedOriginal.style.top = `${clientY}px`;
  }

  function endDrag() {
    const trashType = draggedOriginal.dataset.type;
    let matched = false;

    bins.forEach((bin) => {
      const binType = bin.getAttribute("src").replace(".png", "");
      if (binType === trashType) {
        matched = true;
      }
    });

    if (matched) {
      score++;
      scoreDisplay.textContent = score;
      currentTrashIndex++;
      loadNextTrash();
    } else {
      draggedOriginal.style.left = startLeft;
      draggedOriginal.style.top = startTop;
    }

    draggedOriginal.style.opacity = "1";
    document.removeEventListener("mousemove", dragMove);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", dragMove);
    document.removeEventListener("touchend", endDrag);
  }
});
