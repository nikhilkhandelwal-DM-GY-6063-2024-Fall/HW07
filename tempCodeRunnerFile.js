let words = [];
let positions = [];
let velocities = [];
let scales = [];
let colors = [];
let targetPositions = [];
let isAssembled = false;
let highlightedWords = ["Breathe"];

function preload() {
  words = loadStrings('text.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textSize(32);
  textAlign(CENTER, CENTER);
  frameRate(30);

  // Flatten words and initialize properties
  words = words.join(' ').split(' ');
  for (let i = 0; i < words.length; i++) {
    positions.push(createVector(random(width), random(height)));
    velocities.push(createVector(random(-1, 1), random(0.5, 1.5))); // Slow fall effect
    scales.push(1);
    colors.push(color(200)); // Initial gray color

    // Set target positions for assembling the poem
    let x = width / 2 - (words.length * 20) / 2 + (i % 5) * 100; // Arrange in a column
    let y = height / 2 - (words.length * 10) / 2 + floor(i / 5) * 40;
    targetPositions.push(createVector(x, y));
  }
}

function draw() {
  background(0, 50); // Semi-transparent for trails

  // Animate each word
  for (let i = 0; i < words.length; i++) {
    if (!isAssembled) {
      // Bounce on edges
      if (positions[i].x < 0 || positions[i].x > width) velocities[i].x *= -1;
      if (positions[i].y < 0 || positions[i].y > height) velocities[i].y *= -1;

      // Apply velocity and keep words on screen
      positions[i].add(velocities[i]);

      // Breathing effect on certain words
      let scaleFactor = highlightedWords.includes(words[i]) ? map(sin(frameCount * 0.05 + i), -1, 1, 1, 1.3) : 1;
      scales[i] = scaleFactor;

      // Interactive "wind" effect based on mouse proximity
      let d = dist(mouseX, mouseY, positions[i].x, positions[i].y);
      if (d < 100) {
        let angle = atan2(positions[i].y - mouseY, positions[i].x - mouseX);
        velocities[i].add(createVector(cos(angle), sin(angle)).mult(0.05)); // Subtle push away
      }

      // Color changes for "highlighted" words
      colors[i] = highlightedWords.includes(words[i]) ? color(255, random(150, 255), random(150, 255)) : color(200);
    } else {
      // Move towards the target position
      let direction = p5.Vector.sub(targetPositions[i], positions[i]);
      direction.mult(0.1); // Control speed of transition
      positions[i].add(direction);
      scales[i] = 1; // Reset scale
      colors[i] = color(255); // Set final color for assembled poem
    }

    // Draw each word with current properties
    push();
    translate(positions[i].x, positions[i].y);
    scale(scales[i]);
    fill(colors[i]);
    text(words[i], 0, 0);
    pop();
  }
}

// Toggle between assembled and scattered on mouse click
function mousePressed() {
  isAssembled = !isAssembled;
}
