import { update as updateSnake, draw as drawSnake, getSnakeTop, resetSnake, snakeCollision } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { checkBorder } from './grid.js';

let isTimeDone = false;

export function startNormalGame(game_board){
    update();
    draw(game_board);
    return checkGameOver();
}

export function startSpecialGame(game_board){
    update();
    draw(game_board);
    return checkGameOver() || checkTimeOver();
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

function checkTimeOver(){
    return isTimeDone;
}

export function switchTimer(val){
    isTimeDone = val;
}