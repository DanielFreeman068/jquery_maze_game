# Maze Game

## Preview

![Maze Game Preview](/pics/mazeGame.png)

## Description
This JQUERY maze game allows the player to navigate through a maze of varying difficulty levels. The player can use arrow keys to move through the maze while a timer tracks how quickly they complete the game. The game can be customized by modifying the maze layout, adjusting the timer, or adding obstacles.

## Installation

1. Download or clone the repository.
2. Open `index.html` in your preferred browser.
3. **Note**: This project uses [jQuery](https://jquery.com/) for DOM manipulation. Make sure the jQuery library is included in your HTML.

## Usage

### Start the Game
The game will start automatically when the page is loaded. The player can choose the difficulty by clicking the corresponding difficulty button (easy, medium, hard).

### Controls
Use the arrow keys (up, down, left, right) to navigate through the maze.

### Timer
The timer starts as soon as the player moves, and it stops when the player reaches the endpoint.

### Score
The score is shown on the screen and decreases as time passes.

### Reset
The game can be restarted by refreshing the page or clicking the "Restart" button (if implemented).

## Code Structure

- **index.html**: The main HTML file that contains the game structure.
- **style.css**: The CSS file that styles the maze and game elements.
- **game.js**: The JavaScript file that handles the maze generation, game logic, timer, and player movement.

## Game Logic

### Maze Setup
The maze is created as a 2D array, with 1s representing walls and 0s representing open paths.

### Player Movement
The player is represented by an object with x and y coordinates, which are updated when the player moves.

### Timer
The timer starts when the game begins and stops when the player reaches the endpoint.

### Difficulty Levels
The maze changes based on the difficulty level selected. The higher the difficulty, the larger and more complex the maze becomes.

## Customization

### Change Maze Layout
You can modify the maze arrays for each difficulty level to create custom maze layouts.

### Adjust Timer
The timer can be adjusted to make the game easier or harder by changing the scoring and timing system.

### Add Obstacles
You can add more obstacles by changing the maze arrays (increasing the number of 1s) or by adding additional features like moving obstacles.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements
This project uses jQuery for DOM manipulation. Visit [jquery.com](https://jquery.com/) to learn more.
