$(document).ready(function() {
    let maze = [];
    let player = { x: 0, y: 0 }; 
    let endpoint = { x: 0, y: 0 }; 
    const mazeContainer = $('#maze');
    let timerInterval;


    // So letting you know 1 is a border block, 0 is a block that the user can move in, and 2 is the goal
    const mazes = {
        easy: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 1, 0, 0, 1],
            [1, 2, 1, 1, 0, 1],
            [1, 1, 1, 1, 1, 1]
        ],
        medium: [
            [1, 1, 1, 1, 1, 1],
            [1, 0, 1, 0, 0, 1],
            [1, 0, 1, 1, 0, 1],
            [1, 0, 0, 0, 1, 1],
            [1, 1, 1, 0, 2, 1],
            [1, 1, 1, 1, 1, 1]
        ],
        hard: [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 ,1, 1, 1, 1],
            ]
    };

    $('.level-button').on('click', function() {
        let level = $(this).attr('id');
        startGame(level);
    });


    function startGame(level) {
        $('#landing-page').hide();
        $('#game-container').show();
        initializeMaze(level);
        resetTimer();
    }

    function initializeMaze(level) {
        maze = mazes[level];
        findPlayerAndEndpoint();
        drawMaze();
    }

    function findPlayerAndEndpoint() {
        player = { x: -1, y: -1 }; 
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

    function drawMaze() {
        mazeContainer.empty();
        const numRows = maze.length;
        const numCols = maze[0].length;
        const cellSize = Math.min(600 / numRows, 600 / numCols);  
    
        maze.forEach((row, y) => {
            row.forEach((cell, x) => {
                let type = cell === 1 ? 'wall' : (cell === 2 ? 'endpoint' : 'path');
                let cellElement = $('<div class="maze-cell ' + type + '"></div>');
                cellElement.css({
                    width: `${cellSize}px`,
                    height: `${cellSize}px`
                });
                if (x === player.x && y === player.y) {
                    cellElement.addClass('player');
                }
                mazeContainer.append(cellElement);
            });
            mazeContainer.append('<br style="clear: both;">'); 
        });
    }

    function resetTimer() {
        clearInterval(timerInterval);
        let startTime = new Date();
        timerInterval = setInterval(function() {
            $('#timer span').text(((new Date - startTime) / 1000).toFixed(2) + " Seconds");
        }, 1000);
    }

    $(document).on('keydown', function(event) {
        handleMovement(event.key.replace('Arrow', '').toLowerCase());
    });

    $('.arrow-key').on('click', function() {
        handleMovement($(this).attr('id'));
    });

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

    function isValidMove(pos) {
        return maze[pos.y] && (maze[pos.y][pos.x] === 0 || maze[pos.y][pos.x] === 2);
    }

    function checkWin() {
        if (player.x === endpoint.x && player.y === endpoint.y) {
            clearInterval(timerInterval);
            setTimeout(() => {
                alert("Congratulations! You've reached the end of the maze!");
                $('#game-container').hide();
                $('#landing-page').show();
            }, 200); 
        }
    }

    $('.arrow-key').hover(
        function() {
            $(this).css('filter', 'brightness(110%)');
        },
        function() {
            $(this).css('filter', 'brightness(100%)');
        }
    );

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
});