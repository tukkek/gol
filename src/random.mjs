//https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
export class Random{
  constructor(seed){
    this.seed=seed;
  }
  
  get(){
    var x=Math.sin(this.seed++)*10000;
    return x-Math.floor(x);
  }
  
  roll(min,max){
    return min+Math.floor(this.get()*Math.floor(max-min));
  }
}

export function roll(min,max){
  return min+Math.floor(Math.random()*Math.floor(1+max-min));
}
