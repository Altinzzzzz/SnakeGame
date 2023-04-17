import { getSpeed } from './snake.js';
import { button_parent } from './mainLogic.js';
import { showDifficulty, showGame, replayMenu, showCustomPage } from './sections.js'
import { showFinalScore } from './scores.js';

let main_component = document.querySelector('main');
let reload_game = document.querySelector('#reload_game');

let same_game = document.querySelector('#same_game');
let change_game = document.querySelector('#change_game');
let custom_btn = document.querySelector('#custom_btn');
let custom_page = document.querySelector('#customInputs');
let valueHolder = document.querySelector('#custom_speed');

let the_button, current_speed = 0;

export function startGame(btn){
    the_button = btn;
    if(btn.className != '5'){
        current_speed = 0;
        showGame(button_parent, main_component);
        return Promise.resolve(getSpeed(btn.className));
    } else {
        if(current_speed != 0){
            showGame(custom_page, main_component);
            return Promise.resolve(current_speed);
        }
        showCustomPage(button_parent, custom_page);
        return new Promise((resolve) => {
            custom_btn.addEventListener('click', () => {
                if(valueHolder.value < 1 || valueHolder.value > 30) return;
                const speed = Math.round(valueHolder.value); // valueHolder is the input given by user
                current_speed = speed;
                showGame(custom_page, main_component); // shows the game and removes the custom page
                resolve(speed); // resolve the Promise with the custom speed value
            });
        });
    }
}

export function endGame(){
    showFinalScore();
    replayMenu(main_component, reload_game);
}

same_game.addEventListener('click', () => {
    showGame(reload_game, main_component);
    the_button.click();
});

change_game.addEventListener('click', () => {
    current_speed = 0;
    showDifficulty(reload_game, button_parent);
});