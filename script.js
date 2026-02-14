const fullMessage = `Happy Valentine’s Day to my Bugs bunny❤️, the one who’s been there through everything, from the loud laughs to the quiet tears. You’ve seen every side of me, and somehow you still choose to stay🫂, even after my foolishness and craziness, That means a lot than words can ever express.
You make life brighter in ways I can’t fully explain. You listen when I need to talk, make me laugh when I’m down, and remind me that I’m never alone. You’re not just my best friend; you’re family, a rare kind of person I know I’ll always have in my corner.
I don’t have flowers or chocolates and you don’t want anything according to you today but having someone like you in my life is more than enough. Thank you for being such a genuine soul, for caring the way you do, and for filling my days with love, peace, and happiness.
I’m truly grateful for you, always. Happy Valentine’s Day, i love you mama❤️`;

const typedEl = document.getElementById('typed');

function typeMessage(text, speed=18){
  typedEl.innerHTML = '';
  let i=0;
  const p = document.createElement('p');
  p.style.margin = '0';
  p.style.whiteSpace = 'pre-wrap';
  typedEl.appendChild(p);

  const caret = document.createElement('span');
  caret.className = 'caret';
  p.appendChild(caret);

  function step(){
    if(i < text.length){
      if(caret.parentNode) caret.parentNode.removeChild(caret);
      p.textContent = text.slice(0,i+1);
      p.appendChild(caret);
      i++;
      const ch = text[i-1];
      let delay = speed;
      if(ch === '.' || ch === '!' || ch === '?') delay = speed * 18;
      else if(ch === ',' || ch === '—' || ch === ';') delay = speed * 6;
      setTimeout(step, delay);
    } else {
      if(caret.parentNode) caret.parentNode.removeChild(caret);
    }
  }
  step();
}

window.addEventListener('load', () => {
  typeMessage(fullMessage, 16);
  createFloatingHearts(14);
});

document.getElementById('replay').addEventListener('click', () => {
  typeMessage(fullMessage, 14);
  pulseButton(document.getElementById('playPulse'));
});

const playPulseBtn = document.getElementById('playPulse');
playPulseBtn.addEventListener('click', () => pulseButton(playPulseBtn));

function pulseButton(btn){
  btn.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(1.06)' },
    { transform: 'scale(1)' }
  ], {
    duration: 520,
    easing: 'cubic-bezier(.2,.9,.2,1)'
  });
  heartBurstAt(btn);
}

function heartBurstAt(el){
  const r = el.getBoundingClientRect();
  for(let i=0;i<8;i++){
    const h = createHeart();
    document.body.appendChild(h);
    h.style.left = (r.left + r.width/2 + (Math.random()-0.5)*80) + 'px';
    h.style.top  = (r.top + r.height/2 + (Math.random()-0.5)*40) + 'px';
    h.style.opacity = '1';
    const ang = (Math.random()*2*Math.PI);
    const vx = Math.cos(ang) * (60 + Math.random()*80);
    const vy = Math.sin(ang) * (40 + Math.random()*80) * -1;
    h.animate([
      { transform: 'translate(0px,0px) scale(0.8)', opacity:1 },
      { transform: `translate(${vx}px,${vy}px) scale(1.2)`, opacity:0 }
    ], { duration: 900 + Math.random()*400, easing: 'cubic-bezier(.2,.9,.2,1)' });
    setTimeout(()=> h.remove(), 1400);
  }
}

function createHeart(){
  const el = document.createElement('div');
  el.className = 'floating-heart';
  const size = 10 + Math.floor(Math.random()*18);
  el.style.width = size+'px';
  el.style.height = size+'px';
  el.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="${randomHeartColor()}" d="M12 21s-7-4.667-9.166-7.083C0.803 11.97 3.225 7 7.5 7c2.014 0 3.25 1.17 4.5 2.56C12.25 8.17 13.486 7 15.5 7 19.775 7 22.197 11.97 21.166 13.917 19 16.333 12 21 12 21z"/></svg>`;
  return el;
}

function randomHeartColor(){
  const colors = ['#ff6b81','#ff8aa0','#ff3b6b','#ff9db2','#ffc1cc'];
  return colors[Math.floor(Math.random()*colors.length)];
}

function createFloatingHearts(n=12){
  for(let i=0;i<n;i++){
    const h = createHeart();
    const left = Math.random()*innerWidth;
    const size = 8 + Math.floor(Math.random()*22);
    h.style.left = left + 'px';
    h.style.bottom = (-Math.random()*60 - 10) + 'px';
    h.style.opacity = 0.75;
    document.body.appendChild(h);
    const duration = 9000 + Math.random()*12000;
    const delay = Math.random()*2000;
    h.style.animationDuration = duration + 'ms';
    h.style.animationDelay = delay + 'ms';
  }
}

document.getElementById('download').addEventListener('click', () => {
  const content = '<!doctype html>\n' + document.documentElement.outerHTML;
  const blob = new Blob([content], {type: 'text/html'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'valentines.html';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

document.getElementById('print').addEventListener('click', () => {
  window.print();
});

window.addEventListener('keydown', (e) => {
  if(e.key.toLowerCase() === 'r') typeMessage(fullMessage, 14);
});
