import {update as updateSnake, draw as drawSnake, setSpeed, getSnakeTop, snakeCollision} from './snake.js';
import {update as updateFood, draw as drawFood} from './food.js';
import {checkBorder} from './grid.js';

let main_component = document.querySelector('main');
let button_parent = document.querySelector('#chooseMode');
let game_board = document.querySelector('#game_board');
let current_score = document.querySelector('#current_score');
let top_score = document.querySelector('#top_score');
let snake_speed;

for(let btn of button_parent.children){
    btn.addEventListener('click', (event) => {

        button_parent.className = 'endAnimation';
        snake_speed = setSpeed(event.target.className);
    
        setTimeout(() => {
            button_parent.style.display = 'none';
            main_component.style.display = 'flex';
            main_component.className = 'showAnimation';
        }, 1000);
        
        setTimeout(() => {
            window.requestAnimationFrame(main);
        }, 2000);
    })
}

let last_render_time = 0;
let game_over = false;

if(localStorage.getItem('topScore') != null){
    top_score.textContent = localStorage.getItem('topScore');
}

function main(currentTime){
    if(game_over){

        if(+top_score.textContent < +current_score.textContent){
            localStorage.setItem('topScore', current_score.textContent);
            top_score.textContent = localStorage.getItem('topScore');
        }

        if(confirm('You Lost. Press OK to restart.')){
            current_score.textContent = 0;
            // game_over = false;
            window.location.reload();
        }

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