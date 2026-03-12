let topZ = 100;

// BOOT SCREEN con cortina tipo XP
window.addEventListener("load", () => {
  const boot = document.getElementById("boot");
  const text = boot.querySelector(".boot-text");

  if (boot) {
    // crear cortinas reales
    const left = document.createElement("div");
    left.className = "boot-curtain left";
    const right = document.createElement("div");
    right.className = "boot-curtain right";

    boot.appendChild(left);
    boot.appendChild(right);

    // esperar un momento y luego animar cortinas
    setTimeout(() => {
      left.style.transform = "translateX(-100%)";
      right.style.transform = "translateX(100%)";
      text.style.opacity = 0;

      // quitar el boot screen después de la animación
      setTimeout(() => {
        boot.style.display = "none";
      }, 1000); // coincide con la duración de la transición
    }, 1000); // tiempo que se queda el texto inicial
  }
});

// CREAR VENTANAS
function createWindow(titleText, htmlContent) {
  const win = document.createElement("div");
  win.className = "window";

  if (window.innerWidth <= 700) {
    win.style.top = "10vh";
    win.style.left = "5vw";
    win.style.width = "90vw";
  } else {
    win.style.top = (120 + Math.random() * 120) + "px";
    win.style.left = (250 + Math.random() * 200) + "px";
    win.style.width = "320px";
  }

  win.style.zIndex = topZ;

  win.innerHTML = `
    <div class="title-bar">
      <span class="title">${titleText}</span>
      <span class="buttons">X</span>
    </div>
    <div class="content">${htmlContent}</div>
  `;

  document.querySelector(".desktop").appendChild(win);

  // animación suave al aparecer
  requestAnimationFrame(() => win.classList.add("show"));

  // CERRAR
  const closeBtn = win.querySelector(".buttons");
  closeBtn.addEventListener("click", () => win.remove());
  closeBtn.addEventListener("touchstart", (e) => { e.preventDefault(); win.remove(); });

  // SUPERPOSICIÓN
  function bringToFront() {
    topZ++;
    win.style.zIndex = topZ;
  }
  win.addEventListener("mousedown", bringToFront);
  win.addEventListener("touchstart", bringToFront);

  // DRAG
  const bar = win.querySelector(".title-bar");
  function dragStart(e) {
    e.preventDefault();
    let clientX = e.clientX || e.touches[0].clientX;
    let clientY = e.clientY || e.touches[0].clientY;
    const rect = win.getBoundingClientRect();
    let shiftX = clientX - rect.left;
    let shiftY = clientY - rect.top;

    function moveAt(pageX, pageY) {
      let newLeft = pageX - shiftX;
      let newTop = pageY - shiftY;
      if (window.innerWidth <= 700) {
        const maxLeft = window.innerWidth - win.offsetWidth;
        const maxTop = window.innerHeight - win.offsetHeight;
        newLeft = Math.max(0, Math.min(newLeft, maxLeft));
        newTop = Math.max(0, Math.min(newTop, maxTop));
      }
      win.style.left = newLeft + "px";
      win.style.top = newTop + "px";
    }

    function onMove(e) {
      e.preventDefault();
      let moveX = e.clientX || e.touches[0].clientX;
      let moveY = e.clientY || e.touches[0].clientY;
      moveAt(moveX, moveY);
    }

    function stopMove() {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("touchmove", onMove);
    }

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove, { passive: false });
    document.addEventListener("mouseup", stopMove, { once: true });
    document.addEventListener("touchend", stopMove, { once: true });
  }

  bar.addEventListener("mousedown", dragStart);
  bar.addEventListener("touchstart", dragStart, { passive: false });
}

// PROGRAMAS
function openProgram(program) {
  if (program === "music") {
    createWindow(
      "Adelantos.exe",
      `
      <div class="player">
        <b>Windows Media Player</b><br><br>
        Track: preview1.wav<br><br>
        <audio controls>
          <source src="preview1.wav">
        </audio>
      </div>
      `
    );
  }

  if (program === "about") {
    createWindow(
      "sobre_jlv.txt",
      `
      Artista: JLVtrp<br>
      Estilo: Trap/Rap<br><br>
      Próximos lanzamientos pronto...
      `
    );
  }

  if (program === "links") {
    createWindow(
      "links.html",
      `
      <a href="https://open.spotify.com/intl-es/artist/5uDNXErtZ5xgfqwcsBOCfb?si=GWozXhBbR0ecefLSQ31oFA">Spotify</a><br><br>
      <a href="https://www.youtube.com/@JLVtrp">YouTube</a><br><br>
      <a href="https://www.instagram.com/jlv.trp/">Instagram</a>
      `
    );
  }

  if (program === "trash") {
    createWindow("Papelera", "La papelera está vacía");
  }
}