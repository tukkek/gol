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

  //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = this.roll(0,currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

export function roll(min,max){
  return min+Math.floor(Math.random()*Math.floor(1+max-min));
}
