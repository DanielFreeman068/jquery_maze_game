$(document).ready(function () {
    let maze = [];
    let player = { x: 0, y: 0 };
    let endpoint = { x: 0, y: 0 };
    const mazeContainer = $('#maze');
    let timerInterval;
    let startTime;
    let score;
    const scoreDecrement = 10;
    let currentLevel = 'easy';
    let powa = 0;

    const med = document.getElementById('medium');
    const har = document.getElementById('hard');
    med.classList.add('medium');
    har.classList.add('hard');

    //maze options
    const mazes = {
        easy: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1],
            [1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
            [1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1],
            [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
            [1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 2],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ],
        medium: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
            [1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 2, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        ],
        hard: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1 ,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0 ,0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ,1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0 ,0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1 ,1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0 ,0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 2 ,1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1 ,1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1 ,1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0 ,0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1 ,0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1 ,1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0 ,0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ,1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
            [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1 ,0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0 ,1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0 ,0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1],
        ],
    };

    /**
     * Level Button Click Handler
     * Listens for clicks on level selection buttons and starts the game with the selected level
     */
    $('.level-button').on('click', function() {
        currentLevel = $(this).data('level'); 
        startGame(currentLevel);
    });

    /**
     * Game Initialization Function
     * Starts the game with the selected difficulty level
     * Checks if player has unlocked the selected level based on 'powa' value
     * Shows appropriate alerts if level is locked
     * @param {string} level - The difficulty level to start ('easy', 'medium', or 'hard')
     */
    function startGame(level) {
        currentLevel = level;
        if(currentLevel == 'easy' && powa >= 0){
            $('#landing-page').hide();
            $('#game-container').show();
            initializeMaze(level);
            resetTimer();
        } else if(currentLevel == 'medium' && powa >= 1){
            $('#landing-page').hide();
            $('#game-container').show();
            initializeMaze(level);
            resetTimer();
        } else if (currentLevel == 'hard' && powa >= 100){
            $('#landing-page').hide();
            $('#game-container').show();
            initializeMaze(level);
            resetTimer();
        } else {
            if(currentLevel == "medium"){
                alert(`Beat the Easy level before attempting this`);
            } else if (currentLevel == "hard" && powa < 1){
                alert(`You still have to beat the Easy and Medium levels before attempting this`);
            } else {
                alert(`You must complete the Medium level to attempt this`);
            }
        }
    }

    /**
     * Maze Initialization Function
     * Sets up the maze based on the selected level
     * Locates player and endpoint position
     * Draws the maze and initializes timer and score
     * @param {string} level - The difficulty level to initialize
     */
    function initializeMaze(level) {
        maze = mazes[level];
        findPlayerAndEndpoint();
        drawMaze();
        startTime = new Date();
        score = 1000; 
        updateScore();
    }

    /**
     * Player and Endpoint Finder
     * Scans the maze array to find starting position for player and endpoint location
     * Player starts at the first available path cell (0)
     * Endpoint is marked with value 2 in the maze array
     */
    function findPlayerAndEndpoint() {
        player = { x: -1, y: -1 }; 
        endpoint = { x: -1, y: -1 }; // Reset endpoint too
        
        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 0 && player.x === -1 && player.y === -1) {
                    player.x = x;
                    player.y = y;
                }
                if (cell === 2) {
                    endpoint.x = x;
                    endpoint.y = y;
                }
            });
        });
    }

    /**
     * Maze Drawing Function
     * Renders the maze on screen with visual elements for walls, paths, and player
     * Calculates cell dimensions based on maze size
     * Implements "fog of war" effect showing only cells near player
     */
    function drawMaze() {
        mazeContainer.empty();
        const numRows = maze.length;
        const numCols = maze[0].length;
        
        const cellWidth = Math.floor(600 / numCols);
        const cellHeight = Math.floor(600 / numRows);

        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                let type = cell === 1 ? 'wall' : (cell === 2 ? 'endpoint' : 'path');
                let cellElement = $('<div class="maze-cell ' + type + '"></div>');
                cellElement.css({
                    width: `${cellWidth}px`,
                    height: `${cellHeight}px`,
                    opacity: '0' 
                });

                if (Math.abs(x - player.x) <= 2 && Math.abs(y - player.y) <= 2) {
                    cellElement.css('opacity', '1'); 
                }

                if (x === player.x && y === player.y) {
                    cellElement.addClass('player');
                }

                mazeContainer.append(cellElement);
            });
            mazeContainer.append('<div style="clear: both;"></div>'); 
        });
    }

    /**
     * Timer Management Function
     * Sets up and manages the game timer with minutes:seconds:milliseconds format
     * Updates the timer display every 10ms for smooth millisecond display
     * Calculates and updates score based on elapsed time
     */
    function resetTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(function() {
            let elapsed = new Date() - startTime;
            
            // Calculate minutes, seconds, and milliseconds
            let minutes = Math.floor(elapsed / 60000);
            let seconds = Math.floor((elapsed % 60000) / 1000);
            let milliseconds = Math.floor((elapsed % 1000) / 10); // Only keep 2 digits of ms
            
            // Format with leading zeros
            let formattedMinutes = minutes.toString().padStart(2, '0');
            let formattedSeconds = seconds.toString().padStart(2, '0');
            let formattedMilliseconds = milliseconds.toString().padStart(2, '0');
            
            // Display formatted time
            $('#timer span').text(`${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`);
            
            // Keep your existing score calculation
            score = Math.max(0, 1000 - Math.floor(elapsed/1000) * scoreDecrement); 
            updateScore();
        }, 10);
    }

    /**
     * Keyboard Control Handler
     * Detects keyboard arrow key presses and translates them to player movement
     */
    $(document).on('keydown', function(event) {
        handleMovement(event.key.replace('Arrow', '').toLowerCase());
    });

    /**
     * On-screen Arrow Button Handler
     * Enables player movement through clicking on-screen arrow buttons
     */
    $('.arrow-key').on('click', function() {
        handleMovement($(this).attr('id'));
    });

    /**
     * Movement Handler Function
     * Processes player movement in specified direction
     * Validates moves and updates player position
     * Checks if player has reached the endpoint
     * @param {string} direction - Direction to move ('up', 'down', 'left', or 'right')
     */
    function handleMovement(direction) {
        let newPos = { x: player.x, y: player.y };
        if (direction === 'up') newPos.y--;
        if (direction === 'down') newPos.y++;
        if (direction === 'left') newPos.x--;
        if (direction === 'right') newPos.x++;

        if (isValidMove(newPos)) {
            player.x = newPos.x;
            player.y = newPos.y;
            drawMaze();
            checkWin();
        }
    }

    /**
     * Move Validation Function
     * Checks if a proposed move is valid (path or endpoint, not wall or out of bounds)
     * @param {Object} pos - Position object with x and y coordinates
     * @return {boolean} - Whether the move is valid
     */
    function isValidMove(pos) {
        return maze[pos.y] && (maze[pos.y][pos.x] === 0 || maze[pos.y][pos.x] === 2);
    }

    /**
     * Score Update Function
     * Updates the score display on the screen
     */
    function updateScore() {
        $('#score span').text(score);
    }

    /**
     * Win Condition Check Function
     * Checks if player has reached the endpoint
     * Handles level unlocking, confetti celebration, and game reset
     */
    function checkWin() {
        if (player.x === endpoint.x && player.y === endpoint.y) {
            // First-time completion - unlock levels
            if (currentLevel === 'easy' && !(med.classList.contains('magic1'))) {
                med.classList.add('magic1');
                med.classList.remove('medium');
                if (document.querySelector('#medium .lock-icon')) {
                    document.querySelector('#medium .lock-icon').remove();
                }
                powa += 1;
            } else if (currentLevel === 'medium' && !(har.classList.contains('magic'))) {
                har.classList.add('magic');
                har.classList.remove('hard');
                if (document.querySelector('#hard .lock-icon')) {
                    document.querySelector('#hard .lock-icon').remove();
                }
                powa += 100;
            }
            
            // Show win celebration for both first-time and replays
            clearInterval(timerInterval);
            setTimeout(() => {
                alert(`Congrats! You found the end with a score of ${score}`);
                $('#game-container').hide();
                $('#landing-page').show();
                $('#leaderboard-container').hide();
            }, 200);
            
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 } 
            });
        }
    }

    /**
     * Button Hover Effect Handler
     * Adds visual feedback when hovering over arrow buttons
     */
    $('.arrow-key').hover(
        function() {
            $(this).css('filter', 'brightness(110%)');
        },
        function() {
            $(this).css('filter', 'brightness(100%)');
        }
    );

    /**
     * Title Animation Function
     * Applies wave animation effect to the game title
     */
    applyWaveAnimation(); 

    function applyWaveAnimation() {
        $('#title-wave span').each(function(index) {
            var delay = index;
            var position = 0;
            setInterval(() => {
                $(this).css('transform', 'translateY(' + Math.sin(position) * 10 + 'px)');
                position += 0.1;
                if (position > 2 * Math.PI) {
                    position = 0;
                }
            }, delay);
        });
    }

    /**
     * Maze Zoom Adjustment Function
     * Adjusts the game's zoom level based on screen width for responsive display
     * Makes the game playable on different screen sizes
     */
    function adjustMazeZoom() {
        const screenWidth = window.innerWidth;

        document.body.style.zoom = "85%";

        if (screenWidth < 1200 && screenWidth >= 992) {
            document.body.style.zoom = "85%";
        } else if (screenWidth < 992 && screenWidth >= 768) {
            document.body.style.zoom = "75%";
        } else if (screenWidth < 768 && screenWidth >= 576) {
            document.body.style.zoom = "65%";
        } else if (screenWidth < 576) {
            document.body.style.zoom = "50%";
        }
    }

    // Adjust on load
    adjustMazeZoom();

    // Adjust when window resizes
    $(window).on('resize', adjustMazeZoom);

});