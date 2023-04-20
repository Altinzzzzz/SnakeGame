import { getSpeed } from './snake.js';
import { button_parent } from './mainLogic.js';
import { showDifficulty, showGame, replayMenu, showCustomPage } from './sections.js'
import { showFinalScore } from './scores.js';

let main_component = document.querySelector('main');
let reload_game = document.querySelector('#reload_game');

let same_game = document.querySelector('#same_game');
let change_difficulty = document.querySelector('#change_difficulty');
let change_mode = document.querySelector('#change_mode');
let custom_page = document.querySelector('#customInputs');
let custom_btn = document.querySelector('#custom_btn');
let custom_speed_input = document.querySelector('#custom_speed_input');
let custom_food_input = document.querySelector('#custom_food_input');
let the_button, current_speed = 0, current_food = 1;

export function normalGameLogic(btn){
    the_button = btn;
    if(btn.className != '5'){
        current_speed = getSpeed(btn.className);
        current_food = 1;
        showGame(button_parent, main_component);
        return Promise.resolve([current_speed, current_food]);
    } else {
        if(current_speed != 0){
            showGame(custom_page, main_component);
            return Promise.resolve([current_speed, current_food]);
        }
        showCustomPage(button_parent, custom_page);
        return new Promise((resolve) => {
            custom_btn.addEventListener('click', () => {
                if(custom_speed_input.value < 1 || custom_speed_input.value > 30) return;
                if(custom_food_input.value < 1 || custom_food_input.value > 5) return;
                current_speed = Math.round(custom_speed_input.value); // valueHolder is the input given by user
                current_food = Math.round(custom_food_input.value);
                showGame(custom_page, main_component); // shows the game and removes the custom page
                resolve([current_speed, current_food]); // resolve the Promise with the custom speed value
            });
        });
    }
}

// export function specialGameLogic(btn){

// }

export function endGame(){
    showFinalScore();
    replayMenu(main_component, reload_game);
}



same_game.addEventListener('click', () => {
    showGame(reload_game, main_component);
    the_button.click();
});

change_difficulty.addEventListener('click', () => {
    current_speed = 0;
    showDifficulty(reload_game, button_parent);
});

change_mode.addEventListener('click', () => {
    ///
})