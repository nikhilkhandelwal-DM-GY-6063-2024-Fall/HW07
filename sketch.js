let words = [];
let positions = [];
let velocities = [];
let targetPositions = [];
let scales = [];
let assembled = false;

function preload() {
  words = loadStrings('text.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  frameRate(30);

  words = words.join(' ').split(' ');
  for (let i = 0; i < words.length; i++) {
    positions.push(createVector(random(width), random(height))); 
    velocities.push(createVector(random(-1, 1), random(0.5, 1.5))); // Random velocities
    scales.push(1);

    let x = width / 2 - (words.length * 15) / 2 + (i % 5) * 100;
    let y = height / 2 - (words.length * 5) / 2 + floor(i / 5) * 40;
    targetPositions.push(createVector(x, y));
  }
}

function draw() {
  background(0);

  // Animate each word with breathing effect
  for (let i = 0; i < words.length; i++) {
    if (!assembled) {
      // Apply velocity to scatter words around
      positions[i].add(velocities[i]);

      // Bounce on edges
      if (positions[i].x < 0 || positions[i].x > width) velocities[i].x *= -1;
      if (positions[i].y < 0 || positions[i].y > height) velocities[i].y *= -1;
    } else {
      // Move words toward target positions
      let direction = p5.Vector.sub(targetPositions[i], positions[i]);
      direction.mult(0.1);
      positions[i].add(direction);
    }

    scales[i] = map(sin(frameCount * 0.05 + i), -1, 1, 0.9, 1.1);

    push();
    translate(positions[i].x, positions[i].y);
    scale(scales[i]);
    fill(255);
    text(words[i], 0, 0);
    pop();
  }
}

function mousePressed() {
  assembled = !assembled;
}
