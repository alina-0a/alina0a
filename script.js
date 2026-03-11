/* fade in */
const faders = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
});
faders.forEach(el=>observer.observe(el));

/* ABOUT title animation */
const aboutTitle = document.querySelector(".about-title");
window.addEventListener("scroll",()=>{
  const pos = aboutTitle.getBoundingClientRect().top;
  if(pos < window.innerHeight - 100){
    aboutTitle.classList.add("show");
  }
});

/* dark mode */
document.getElementById("darkToggle").onclick = () => {
  document.body.classList.toggle("dark");
};

/* typing animation */
const text="Designing the Future";
let i=0;
let deleting=false;

function typeLoop(){
  const el=document.getElementById("typing-text");

  if(!deleting){
    el.textContent=text.substring(0,i++);
    if(i>text.length){
      deleting=true;
      setTimeout(typeLoop,2500);
      return;
    }
  }else{
    el.textContent=text.substring(0,i--);
    if(i===0) deleting=false;
  }
  setTimeout(typeLoop,deleting?40:90);
}
typeLoop();

/* particles */
const canvas=document.getElementById("particles");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let particles=[];

for(let i=0;i<120;i++){
  particles.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    size:Math.random()*4,
    speed:0.5+Math.random()
  });
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p=>{
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    ctx.fillStyle="rgba(180,0,120,0.6)";
    ctx.fill();

    p.y+=p.speed;
    if(p.y>canvas.height) p.y=0;
  });

  requestAnimationFrame(animate);
}
animate();

/* p5 flower */
let angle=0;
let floatOffset=0;

function setup(){
  let c=createCanvas(400,400);
  c.parent("flower-container");
  angleMode(DEGREES);
}

function draw(){
  clear();

  translate(width/2,height/2);

  floatOffset=sin(frameCount*1.2)*15;
  translate(0,floatOffset);

  noStroke();
  for(let i=0;i<6;i++){
    fill(200,120,255,20);
    ellipse(0,0,200+i*20);
  }

  rotate(angle);

  for(let i=0;i<10;i++){
    push();
    rotate(i*36);
    fill(255,120,180,170);
    ellipse(60,0,110,45);
    pop();
  }

  fill(255,200,0,200+sin(frameCount*5)*55);
  ellipse(0,0,65,65);

  angle+=0.4;
}