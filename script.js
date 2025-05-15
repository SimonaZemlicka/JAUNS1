document.addEventListener("DOMContentLoaded", () => {
  const trashHolder = document.getElementById("trashHolder");
  const bins = document.querySelectorAll(".bin");
  const scoreDisplay = document.getElementById("score");
  const progressFill = document.getElementById("progressFill");
  const progressIcon = document.getElementById("progressIcon");

  // Noņem burkānu no punktu joslas ikonas
  progressIcon.innerHTML = ""; // Ja tur bija emoji vai <img>
  progressIcon.style.backgroundImage = "none"; // Ja tur bija CSS fons

  let currentTrashIndex = 0;
  let score = 0;
  let draggedOriginal = null;
  let draggedGhost = null;
  let startLeft = "";
  let startTop = "";

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
      trashHolder.innerHTML = `<div class="final-message"><h1>🎉 Visi atkritumi sašķiroti!</h1><p>Tu ieguvi <span class="big-score">${score}</span> punktus no <span class="big-score">${trashItems.length}</span>.</p></div>`;
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

    draggedGhost = draggedOriginal.cloneNode(true);
    draggedGhost.style.opacity = "1";
    draggedGhost.style.position = "fixed";
    draggedGhost.style.left = "0px";
    draggedGhost.style.top = "0px";
    draggedGhost.style.transform = "translate(-50%, -50%)";
    draggedGhost.style.pointerEvents = "none";
    draggedGhost.style.zIndex = "10000";

    document.body.appendChild(draggedGhost);

    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", endDrag);
  }

  function dragMove(e) {
    if (!draggedGhost) return;
    draggedGhost.style.left = `${e.clientX}px`;
    draggedGhost.style.top = `${e.clientY}px`;
  }

  function endDrag() {
    draggedGhost.remove();
    draggedGhost = null;
    currentTrashIndex++;
    loadNextTrash();
  }
});
