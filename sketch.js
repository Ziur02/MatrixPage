//reference code 1:https://github.com/emilyxxie/green_rain/blob/master/sketch.js
//reference code 2:https://github.com/servetgulnaroglu/ytb_matrix_js/blob/master/matrix.js

let CharArr = ["a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "А",
  "В",
  "Г",
  "Д",
  "Є",
  "Ѕ",
  "З",
  "И",
  "Ѳ",
  "І",
  "К",
  "Л",
  "М",
  "Н",
  "Ѯ",
  "Ѻ",
  "П",
  "Ч",
  "Р",
  "С",
  "Т",
  "Ѵ",
  "Ф",
  "Х",
  "Ѱ",
  "Ѿ",
  "Ц",
  " ",
  " ",
  " "];
let speed = 2;
// let char;
let stream;
let streams = [];
let charSize = 18;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  textSize(charSize);
  // char = new Char(width / 2, 0, speed);
  let x = 0;
  for (let i = 0; i < width / charSize; i++) {
    stream = new Stream()
    stream.generateChar(x, random(height));
    streams.push(stream);
    x += charSize;
  }
}

function draw() {
  background(0, 130);
  // char.render();
  streams.forEach(function (stream) {
    stream.render();
  });
}

//单个字符的类
class Char {
  constructor(x, y, speed, opacity, lighter) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.value;
    this.opacity = opacity;
    this.lighter = lighter;
  }

  setToRandomChar() {
    if (frameCount % round(random(5, 6)) == 0) {
      this.value = CharArr[round(random(CharArr.length - 1))];
    }
  }

  rain() {
    this.y = (this.y >= height) ? 0 : this.y += this.speed;
  }

  // render() {
  //   fill(0, 255, 70);
  //   text(this.value, this.x, this.y);
  //   this.setToRandomChar();
  //   this.rain();
  // }
}

//多个字符一组的类
class Stream {
  constructor() {
    this.chars = [];
    this.amount = round(random(height / charSize / 3, height / charSize / 2));
    this.speed = random(2, 4);
    this.opacity;
    this.lighter;
  }
  generateChar(x, y) {
    this.opacity = 255;
    this.lighter = (round(random(0, 3)) == true);
    for (let i = 0; i < this.amount; i++) {
      let char = new Char(x, y, this.speed, this.opacity, this.lighter)
      char.setToRandomChar();
      this.chars.push(char);
      this.chars[round(random(this.chars.length - 1))].opacity = round(random(50, 200))
      y -= charSize;
      this.lighter = false;
    }
  }
  render() {
    this.chars.forEach(function (char) {
      if (char.lighter) {
        fill(210, 255, 230, 240)
      } else {
        fill(0, 255, 170, char.opacity);
      }
      text(char.value, char.x, char.y);
      char.setToRandomChar();
      char.rain();
    });
  }
}