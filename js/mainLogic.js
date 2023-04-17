import { update as updateSnake, draw as drawSnake, getSnakeTop, resetSnake, snakeCollision } from './snake.js';
import { update as updateFood, draw as drawFood } from './food.js';
import { checkBorder } from './grid.js';
import { startGame, endGame } from './startEndGame.js';
import { resetDirection } from './inputDirection.js';
import { putCorrectTopScore } from './scores.js';

export let button_parent = document.querySelector('#choose_mode');

export var snake_len = 2;
let game_over = false;

let game_board = document.querySelector('#game_board');
let snake_speed, top_score;
let last_render_time = 0;

for(let btn of button_parent.children){
    btn.addEventListener('click', (event) => {
        putCorrectTopScore(event.target);
        startGame(event.target).then((speed) => {
            snake_speed = speed;
            setTimeout(() => {
                setAndStart();
            }, 1100)
        })
    })
}

export function main(currentTime){
    if(game_over){
        endGame();
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - last_render_time) / 1000;
    if(secondsSinceLastRender < 1 / snake_speed) return;
    
    last_render_time = currentTime;
    update();
    draw();
}

function update(){
    updateSnake();
    updateFood();
    checkGameOver();
}

function draw(){
    game_board.innerHTML = '';
    drawSnake(game_board);
    drawFood(game_board);
}

function checkGameOver(){
    game_over = checkBorder(getSnakeTop()) || snakeCollision();
}

function setAndStart(){
    resetSnake(); // snake gets set when the game starts, not before
    resetDirection(); // prevents the bug of where you press a key, then choose 
    // the game mode and then the game starts while the snake is moving.
    // this resets the direction and the snake shows up as static.
    game_over = false;
    window.requestAnimationFrame(main);
}