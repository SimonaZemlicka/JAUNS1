document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  // Skaņas iestatījumi
  const backgroundMusic = new Audio('speles_skana.mp3');
  backgroundMusic.volume = 0.4;
  backgroundMusic.loop = true;

  backgroundMusic.play(); // Sāk automātiski

  let currentTrashIndex = 0;
  let score = 0;

  const trashItems = [
    { src: "partika1.png", type: "m1" },
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
    trashHolder.innerHTML = "";

    if (currentTrashIndex >= trashItems.length) {
      trashHolder.innerHTML = `<div class="final-message"><h1>🎉 Visi atkritumi sašķiroti!</h1><p>Tu ieguvi <span class="big-score">${score}</span> punktus no <span class="big-score">${trashItems.length}</span>.</p></div>`;
      return;
    }

    const trash = trashItems[currentTrashIndex];
    const img = document.createElement("img");
    img.src = trash.src;
    img.className = "trash-item";
    img.setAttribute("data-type", trash.type);
    img.style.position = "absolute";
    img.style.left = "50%";
    img.style.top = "50%";
    img.style.transform = "translate(-50%, -50%)";

    trashHolder.appendChild(img);

    img.addEventListener("mousedown", startDrag);
  }

  function startDrag(e) {
    e.preventDefault();
    const draggedItem = e.target;
    draggedItem.style.opacity = "0.5";

    document.addEventListener("mousemove", (e) => moveItem(e, draggedItem));
    document.addEventListener("mouseup", () => endDrag(draggedItem));
  }

  function moveItem(e, item) {
    item.style.left = `${e.clientX}px`;
    item.style.top = `${e.clientY}px`;
  }

  function endDrag(item) {
    item.style.opacity = "1";
    currentTrashIndex++;
    loadNextTrash();
  }
});
