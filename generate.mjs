import {Ufsc,Game} from "./src/gol.mjs";
import canvas from 'canvas';
import fs from 'fs';

const FPS=30;
const MINUTE=FPS*60;
const FRAMES=roll(1,5*60)*FPS;
const SIZE=50;

var frame=canvas.createCanvas(SIZE,SIZE);
var game=new Ufsc(SIZE,SIZE,frame);

run();

function write(filename){
  return new Promise((resolve,reject)=>{
    const out=fs.createWriteStream(filename);
    const stream=frame.createPNGStream(
      {compressionLevel:0,});
    stream.pipe(out);
    out.on('finish',resolve);
  });
}

async function run(){
  let last=-1;
  for(let i=0;i<FRAMES;i++){
    game.step();
    await write('frames/frame'+i+'.png');
    let progress=Math.round(100*i/FRAMES);
    if(progress==last) continue;
    console.log(i,progress+'%');
    last=progress;
  }
}

function roll(min,max) {
  return Math.random()*(max-min)+min;
}
