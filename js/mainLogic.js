import {update as updateSnake, draw as drawSnake, getSnakeTop, resetSnake, snakeCollision} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {checkBorder} from './grid.js';
import {startGame, endGame} from './startEndGame.js';
import {resetDirection} from './inputDirection.js';

export let main_component = document.querySelector('main');
export let button_parent = document.querySelector('#choose_mode');
export let reload_game = document.querySelector('#reload_game');
let game_board = document.querySelector('#game_board');
let current_score = document.querySelector('#current_score');
let top_score = document.querySelector('#top_score');
let prev_score = document.querySelector('#prev_score');
let snake_speed;
let last_render_time = 0;
export let game_over = false;

for(let btn of button_parent.children){
    btn.addEventListener('click', (event) => {
        async function info(){
            let spd = await startGame(event.target);
            snake_speed = spd;
            console.log(spd);
            snake_speed.then(function(snake_speed){
                setTimeout(() => {
                    resetSnake(); // snake gets set when the game starts, not before
                    resetDirection(); // prevents the bug of where you press a key, then choose 
                    // the game mode and then the game starts while the snake is moving.
                    // this resets the direction and the snake shows up as static.
                    game_over = false;
                    window.requestAnimationFrame(main);
                }, 1100);
            })
        }

        info();
    });
}

if(localStorage.getItem('topScore') != null){
    top_score.textContent = localStorage.getItem('topScore');
}

export function main(currentTime){
    if(game_over){
        endGame(current_score, top_score, prev_score);
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
    updateFood(current_score);
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