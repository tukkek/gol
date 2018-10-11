import {roll,Random} from './random.mjs';

export class Game{
	constructor(width,height,canvas){
    this.width=width;
    this.height=height;
    this.empty=Array(width).fill(false).map(
      ()=>Array(height).fill(false));
    this.board=this.getempty();
    this.frame=canvas;
    if(this.frame) this.setupframe(this.frame);
    this.visited=new Set();
    this.setup();
	}
	
	setup(){this.populate(1/100);}
	
	decay(next){this.populate(roll(10,70)/100,next,false);}
	
	getempty(){
    return this.empty.slice().map(e=>e.slice());
  }
	
	setupframe(frame){
    frame=frame.getContext('2d');
    let rgb=[roll(0,255),roll(0,255),roll(0,255)];
    frame.fillStyle='rgb('+rgb.join(',')+')';
    frame.fillRect(0,0,
      this.width,this.height);
  }
	
	populate(ratio,board=this.board,value=true){
		for(let x=0;x<this.width;x++)
			for(let y=0;y<this.height;y++)
        if(Math.random()<ratio) board[x][y]=value;
	}
	
	draw(canvas){
		canvas=canvas.getContext('2d');
		let on="rgb(255,255,255)";
		let off="rgb(0,0,0)";
		for(let x=0;x<this.width;x++)
			for(let y=0;y<this.height;y++){
				canvas.fillStyle=this.board[x][y]?on:off;
				canvas.fillRect(x,y,1,1);
			}
	}
	
	countneighbors(xp,yp){
		let count=0;
		for(let x=xp-1;x<=xp+1;x++)
			for(let y=yp-1;y<=yp+1;y++)
        if(0<=x&&x<this.width)
          if(0<=y&&y<this.height)
            if(this.board[x][y]) count+=1;
		return count;
	}
	
	step(){
    let next=this.getempty();
    for(let x=0;x<this.width;x++){
      for(let y=0;y<this.height;y++){
        let neighbors=this.countneighbors(x,y);
        if(neighbors==2||neighbors==3) next[x][y]=true;
      }
    }
    this.decay(next);
		if(this.frame)
      this.updateframe(this.board,next,this.frame);
		this.board=next;
    /*let hashcode=hash(JSON.stringify(next));
    console.log(hashcode);
    if(this.visited.has(hashcode)) alert('repeat');
    this.visited.add(hashcode);*/
	}
	
	updateframe(current,next,canvas){
    let frame=canvas.getContext('2d');
    let image=frame.getImageData(
      0,0,this.width,this.height).data;
		for(let x=0;x<this.width;x++)
			for(let y=0;y<this.height;y++){
        let increment=next[x][y]?+5:-1;
        let index=(y*this.height+x)*4;
        let rgb=[image[index],image[index+1],image[index+2]];
        let i=roll(0,2);
        rgb[i]=bind(rgb[i]+increment,0,255);
        frame.fillStyle='rgb('+rgb.join(',')+')';
				frame.fillRect(x,y,1,1);
      }
  }
}

export class Ufsc extends Game{
  setup(){
    this.populate(Math.random());
  }
  
  decay(next){
    this.populate(roll(25,50)/100,next,false);
  }
  
  updateframe(current,next,canvas){
    let width=current.length;
    let height=current[0].length;
    let frame=canvas.getContext('2d');
    let image=frame.getImageData(0,0,width,height).data;
    let raster=next.map(
      outer=>outer.map(inner=>inner?0:1).join('')).join('');
    let seed=hash(raster);
    let random=new Random(seed);
    let rgb=[random.roll(0,255),random.roll(0,255),
      random.roll(0,255),]
    frame.fillStyle='rgb('+rgb.join(',')+')';
    frame.fillRect(0,0,width,height);
    let keyholes=[];
    for(let x=0;x<width;x++)
      for(let y=0;y<height;y++)
        if(current[x][y]&&next[x][y])
            keyholes.push({'x':x,'y':y});
    keyholes=random.shuffle(keyholes);
    let nkeyholes=random.roll(0,10);
    if(nkeyholes>keyholes.length) nkeyholes=keyholes.length;
    for(let i=0;i<nkeyholes;i++){
        let key=[rgb[0],rgb[1],rgb[2]];
        for(let i=0;i<3;i++){
            key[i]=random.roll(key[i],255);
            key[i]=random.roll(key[i],255);
        }
        frame.fillStyle='rgb('+key.join(',')+')';
        frame.fillRect(keyholes[i]['x'],keyholes[i]['y'],1,1);
    }
  }
  
  /*check(xp,yp,range,visited){
    for(let x=xp-range;x<=xp+range;x++)
      for(let y=yp-range;y<=yp+range;y++)
        if(visited.has(x+':'+y)) return true;
    return false;
  }*/
}

function bind(x,min,max){
  if(x<min) return min;
  if(x>max) return max;
  return x;
}

//https://stackoverflow.com/questions/194846/is-there-any-kind-of-hash-code-function-in-javascript
function hash(s){
  var hash=0;
  for (var i=0;i<s.length;i++) {
    var character=s.charCodeAt(i);
    hash=((hash<<5)-hash)+character;
    hash=hash&hash;//Convert to 32bit integer
  }
  return hash;
}
