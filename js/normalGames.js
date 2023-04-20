import { update as updateSnake, draw as drawSnake, getSnakeTop, resetSnake, snakeCollision } from './snake.js';
import { update as updateFood, draw as drawFood, setFood } from './food.js';
import { checkBorder } from './grid.js';

export function startNormalGame(game_board, game_over){
    update(game_over);
    draw(game_board);
    return checkGameOver();
}

function update(){
    updateSnake();
    updateFood();
}

function draw(game_board){
    game_board.innerHTML = '';
    drawSnake(game_board);
    drawFood(game_board);
}

function checkGameOver(){
    return checkBorder(getSnakeTop()) || snakeCollision();
}