# HW07: Drawing with Words - Breathing Poem Animation

## Overview

This project is a p5.js animated visualization that uses words from a poem to create an interactive "breathing" effect. Each word expands and contracts rhythmically, simulating a breathing motion. A single click on the canvas assembles the scattered words into a structured poem layout. Clicking again scatters the words, allowing viewers to interact with the piece and experience the poem dynamically.

## Chosen Text

For this project, the following poem was used:

Breathe in the sky, Feel the world sigh. Under the stars, in the night, Hold on, find the light. With each rise, with each fall, Stand tall, answer the call.


This text represents themes of resilience and nature, making it a good match for the breathing animation style.

## Animation Strategy

1. **Breathing Effect**: Each word expands and contracts using a sine wave function to create a smooth breathing motion.
2. **Interactive Click**: A single click assembles all words into a structured layout in the center, forming a poem. Clicking again scatters them across the canvas.
3. **Boundary Handling**: When in the scattered state, words bounce off the edges of the canvas, keeping them visible within the screen.

## Code Explanation

- **loadStrings()**: Loads the poem text from an external `poem.txt` file.
- **Breathing Effect**: A sine function dynamically changes each word's scale over time, creating the breathing motion.
- **Toggle Interaction**: Clicking the canvas toggles between the scattered and assembled states.
- **Boundary Handling**: Words bounce off the screen edges in the scattered state.


