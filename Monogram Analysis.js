occurences = Array(26).fill(0);
percentages = [];
const distribution = [
  8.55, 1.60, 3.16, 3.87, 12.10, 2.18, 2.09, 4.96, 7.33, 0.22, 0.81, 4.21, 2.53,
  7.17, 7.47, 2.07, 0.10, 6.33, 6.73, 8.94, 2.68, 1.06, 1.83, 0.19, 1.72, 0.11
];

function drawBars() {
  stroke(0);
  for (let i = 0; i < 79; i++) {
    if (i % 3 !== 0) {
      fill((i - 1) % 3 == 0 && [150, 75, 255] || [255, 170, 0]);
      let scaling = ((i - 1) % 3 == 0 && (percentages[(i-1)/3]/100) || (distribution[(i-2)/3]/100));
      if (!Number.isNaN(scaling)) {
        rect(i * barWidth, windowHeight*(9/10), barWidth, -(maxBarHeight * scaling));
      }
    }
  }
  fill(50);
  stroke(0, 0);
  for (let i = 65; i < 91; i++) {
    text(String.fromCharCode(i), (windowWidth * ((i-64.6)/26)), windowHeight*(19/20));
  }
}

function getMousePos(x, y) {
  let letter = Math.floor(x/(windowWidth/26));
  let percent = Number.isNaN(percentages[letter]) && "0" || percentages[letter];
  let monogram = String.fromCharCode(letter+65);
  let info = `${monogram}: ${occurences[letter]}\n${percent}%\n(${distribution[letter]}%)`;
  fill(100, 50);
  rect(letter*(windowWidth/26), -5, windowWidth/26, windowHeight);
  fill(25);
  text(info, x, y);
}

function updateCipher() {
  ciphertext = (input.value()).toUpperCase();
  occurences = new Array(26).fill(0);
  percentages = [];
  for (let char of ciphertext) {
    occurences[char.charCodeAt(0) - 65] += 1;
  }

  for (let i of occurences) {
    percentages.push(parseFloat(((i / ciphertext.length)*100).toFixed(2)));
  }
}

function drawLines() {
  stroke(0, 255);
  line(0, windowHeight*(9/10), windowWidth, windowHeight*(9/10));
  for (let i = 10; i <= 110; i += 10) {
    stroke(0, 50);
    let yPos = windowHeight*(9/10) - (maxBarHeight*(i/100));
    line(0, yPos, windowWidth, yPos);
    stroke(0, 0);
    text(i + "%", 0, yPos);
  }
}

function setup() {
  background(255);
  input = createInput();
}

function draw() {
  createCanvas(windowWidth, windowHeight-10);
  input.position(windowHeight/100, windowHeight/100);
  input.size(windowWidth*(98/100));
  textSize(windowWidth/75);
  barWidth = windowWidth/79;
  let maxPercent = Number.isNaN(Math.max(...percentages)) && 1 || Math.max(...percentages);
  maxBarHeight = windowHeight*(85/Math.max(15, maxPercent));

  updateCipher();
  drawBars();
  drawLines();
  getMousePos(mouseX, mouseY);
}
