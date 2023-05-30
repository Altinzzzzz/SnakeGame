import { resetSnake } from './snake.js';
import { update as updateFood, draw as drawFood, setFood } from './food.js';
import { normalGameLogic, endGame, specialGameLogic } from './startEndGame.js';
import { resetDirection } from './inputDirection.js';
// import { chooseGamemode } from './gamemodes.js';
import { startNormalGame, startSpecialGame } from './normalGames.js';
import { putCorrectTopScore } from "./scores.js";
import { showGamemode } from './sections.js';
import { setTimer, isGameOver } from './specialGMTools.js';

export let button_parent = document.querySelector('#normal_mode');
export let special_button_parent = document.querySelector('#special_mode');
let game_board = document.querySelector('#game_board');
let gamemode_parent = document.querySelector('#choose_gamemode_type');
let normal_gamemode = document.querySelector('#normal_gamemode_btn');
let special_gamemode = document.querySelector('#special_gamemode_btn');
let game_over = false;
let snake_speed, snake_food;
let last_render_time = 0;

normal_gamemode.addEventListener('click', () => {
    showGamemode(gamemode_parent, button_parent);
    initializeNormalModes();
})

special_gamemode.addEventListener('click', () => {
    showGamemode(gamemode_parent, special_button_parent);
    initializeSpecialModes();
});

function initializeNormalModes(){
    for(let btn of button_parent.children){
        btn.addEventListener('click', (event) => {
            const setTimer = putCorrectTopScore(event.target);
            normalGameLogic(event.target).then(([speed, food]) => {
                setAndStart([speed, food]);
            })
        })
    }
}

function initializeSpecialModes(){
    console.log(special_button_parent);
    for(let btn of special_button_parent.children){
        btn.addEventListener('click', (event) => {
            const duration = putCorrectTopScore(event.target);
            specialGameLogic(event.target).then(([speed, food]) => {
                setSpecialAndStart([speed, food, duration]);
            })
        })
    }
}

export function setAndStart(arr){
    setTimeout(() => {
        [snake_speed, snake_food] = arr;
        setFood(snake_food);
        resetSnake(); // snake gets set when the game starts, not before
        resetDirection(); // prevents the bug of where you press a key, then choose 
        // the game mode and then the game starts while the snake is moving.
        // this resets the direction and the snake shows up as static.
        game_over = false; 
        window.requestAnimationFrame(main);
    })
}

export function setSpecialAndStart(arr){
    setTimeout(() => {
        const [snake_s, snake_f, duration] = arr;
        snake_speed = snake_s;
        snake_food = snake_f;
        setFood(snake_food);
        resetSnake(); // snake gets set when the game starts, not before
        resetDirection(); // prevents the bug of where you press a key, then choose 
        // the game mode and then the game starts while the snake is moving.
        // this resets the direction and the snake shows up as static.
        game_over = false;
        isGameOver(game_over);
        setTimer(duration);
        window.requestAnimationFrame(main);
    })
}

export function main(currentTime){
    if(game_over){
        isGameOver(game_over);
        endGame();
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - last_render_time) / 1000;
    if(secondsSinceLastRender < 1 / snake_speed) return;
    
    last_render_time = currentTime;
    game_over = startSpecialGame(game_board);
}
