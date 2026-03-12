// script.js

let topZ = 100; // para controlar superposición

function createWindow(titleText, htmlContent){

const win = document.createElement('div');
win.className = 'window';
win.style.top = (120 + Math.random()*120) + 'px';
win.style.left = (250 + Math.random()*200) + 'px';
win.style.zIndex = topZ;

win.innerHTML = `
<div class="title-bar">
<span class="title">${titleText}</span>
<span class="buttons">X</span>
</div>
<div class="content">${htmlContent}</div>
`;

document.querySelector('.desktop').appendChild(win);

// close button
win.querySelector('.buttons').onclick = () => win.remove();

// mantener al frente al hacer click
win.addEventListener('mousedown', () => {
  topZ++;
  win.style.zIndex = topZ;
});

// drag
const bar = win.querySelector('.title-bar');
bar.addEventListener('mousedown', e => {

let shiftX = e.clientX - win.getBoundingClientRect().left;
let shiftY = e.clientY - win.getBoundingClientRect().top;

function moveAt(pageX, pageY){
 win.style.left = pageX - shiftX + 'px';
 win.style.top = pageY - shiftY + 'px';
}

function onMouseMove(e){
 moveAt(e.pageX, e.pageY);
}

document.addEventListener('mousemove', onMouseMove);

document.addEventListener('mouseup', () => {
 document.removeEventListener('mousemove', onMouseMove);
}, { once:true });

});
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