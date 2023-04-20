import { resetSnake } from './snake.js';
import { update as updateFood, draw as drawFood, setFood } from './food.js';
import { normalGameLogic, endGame } from './startEndGame.js';
import { resetDirection } from './inputDirection.js';
import { chooseGamemode } from './gamemodes.js';
import { startNormalGame } from './normalGames.js';

export let button_parent = document.querySelector('#normal_mode');
export let special_button_parent = document.querySelector('#special_mode');
export let game_board = document.querySelector('#game_board');
export let game_over = false;
let snake_speed, snake_food;
let last_render_time = 0;

export function setAndStart(speed, food){
    setTimeout(() => {
        snake_speed = speed;
        snake_food = food;
        setFood(food);
        resetSnake(); // snake gets set when the game starts, not before
        resetDirection(); // prevents the bug of where you press a key, then choose 
        // the game mode and then the game starts while the snake is moving.
        // this resets the direction and the snake shows up as static.
        game_over = false;
        window.requestAnimationFrame(main);
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
    game_over = startNormalGame(game_board, game_over);
}

chooseGamemode();