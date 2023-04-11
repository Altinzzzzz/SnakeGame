import {setSpeed} from './snake.js';
import {main_component, button_parent, reload_game} from './mainLogic.js';

let same_game = document.querySelector('#same_game');
let change_game = document.querySelector('#change_game');
let curr_score;
let the_button;

export function setUp(btn){
    the_button = btn;
    return setSpeed(btn.className);
}

export function startGame(element){
    showGame(element);
}

export function endGame(current_score, top_score, prev_score){
    if(+top_score.textContent < +current_score.textContent){
        localStorage.setItem('topScore', current_score.textContent);
        top_score.textContent = current_score.textContent;
    }

    prev_score.textContent = current_score.textContent;
    current_score.textContent = 0;
    replayMenu();
}

function addAnimation(element, theAnimation){
    element.className = theAnimation;
}

function addDisplay(element, theDisplay){
    element.style.display = theDisplay;
}

function addIt(element, secondElement, displayType){
    addAnimation(element, 'endAnimation');

    setTimeout(() => {
        addDisplay(element, 'none');
        addAnimation(secondElement, 'startAnimation');
        addDisplay(secondElement, displayType);
    }, 1000);
}

function showDifficulty(){
    addIt(reload_game, button_parent, 'flex');
}

function showGame(element){
    addIt(element, main_component, 'flex');
}

function replayMenu(){
    addIt(main_component, reload_game, 'grid');
}

same_game.addEventListener('click', () => {
    showGame(reload_game);
    the_button.click();
});

change_game.addEventListener('click', () => {
    showDifficulty();
});