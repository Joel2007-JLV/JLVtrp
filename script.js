// script.js

let topZ = 100; // para controlar superposición

function createWindow(titleText, htmlContent){

const win = document.createElement('div');
win.className = 'window';

// si es móvil, centrar ventana y tamaño
if(window.innerWidth <= 700){
  win.style.top = '10vh';
  win.style.left = '5vw';
  win.style.width = '90vw';
} else {
  win.style.top = (120 + Math.random()*120) + 'px';
  win.style.left = (250 + Math.random()*200) + 'px';
  win.style.width = '320px';
}

win.style.zIndex = topZ;

win.innerHTML = `
<div class="title-bar">
<span class="title">${titleText}</span>
<span class="buttons">X</span>
</div>
<div class="content">${htmlContent}</div>
`;

document.querySelector('.desktop').appendChild(win);

// close button compatible con móvil
win.querySelector('.buttons').addEventListener('click', () => win.remove());
win.querySelector('.buttons').addEventListener('touchstart', e => { e.preventDefault(); win.remove(); });

// mantener al frente al hacer click o tocar en móvil
win.addEventListener('mousedown', () => {
  topZ++;
  win.style.zIndex = topZ;
});
win.addEventListener('touchstart', () => {
  topZ++;
  win.style.zIndex = topZ;
});

// drag para escritorio y móvil con límites solo en móvil
const bar = win.querySelector('.title-bar');

function dragStart(e){
  e.preventDefault();
  let clientX = e.clientX || e.touches[0].clientX;
  let clientY = e.clientY || e.touches[0].clientY;
  let shiftX = clientX - win.getBoundingClientRect().left;
  let shiftY = clientY - win.getBoundingClientRect().top;

  function moveAt(pageX, pageY){
    let newLeft = pageX - shiftX;
    let newTop = pageY - shiftY;

    // límites solo en móvil
    if(window.innerWidth <= 700){
      const maxLeft = window.innerWidth - win.offsetWidth;
      const maxTop = window.innerHeight - win.offsetHeight;
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
    }

    win.style.left = newLeft + 'px';
    win.style.top = newTop + 'px';
  }

  function onMove(e){
    e.preventDefault();
    let moveX = e.clientX || e.touches[0].clientX;
    let moveY = e.clientY || e.touches[0].clientY;
    moveAt(moveX, moveY);
  }

  document.addEventListener('mousemove', onMove);
  document.addEventListener('touchmove', onMove, {passive:false});

  function stopMove(){
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('touchmove', onMove);
  }

  document.addEventListener('mouseup', stopMove, { once:true });
  document.addEventListener('touchend', stopMove, { once:true });
}

bar.addEventListener('mousedown', dragStart);
bar.addEventListener('touchstart', dragStart, {passive:false});
bar.ondragstart = () => false;

}

function openProgram(program){

if(program === 'music'){
createWindow(
'Adelantos.exe',
`
<b>Canción</b><br><br>
<audio controls>
<source src="preview1.wav" type="audio/mpeg">
</audio>
<br><br>
`
);
}

if(program === 'about'){
createWindow(
'sobre_jlv.txt',
`
Artista: JLVtrp<br>
Estilo: Trap/Rap <br><br>
Próximos lanzamientos pronto...
`
);
}

if(program === 'links'){
createWindow(
'links.html',
`
<a href="https://open.spotify.com/intl-es/artist/5uDNXErtZ5xgfqwcsBOCfb?si=GWozXhBbR0ecefLSQ31oFA">Spotify</a><br><br>
<a href="https://www.youtube.com/@JLVtrp">YouTube</a><br><br>
<a href="https://www.instagram.com/jlv.trp/">Instagram</a>
`
);
}

}