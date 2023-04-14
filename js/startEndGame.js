import {getSpeed} from './snake.js';
import {main_component, button_parent, reload_game} from './mainLogic.js';

let same_game = document.querySelector('#same_game');
let change_game = document.querySelector('#change_game');
let custom_btn = document.querySelector('#custom_btn');
let custom_page = document.querySelector('#customInputs');
let valueHolder = document.querySelector('#custom_speed');

let the_button;

export function setUpSpeed(btn){
    the_button = btn;
    return getSpeed(btn.className);
}

export function startGame(btn){
    let speed;
    if(btn.className != '5'){
        speed = setUpSpeed(btn); 
        showGame(button_parent);
        return speed;
    } else {
        showCustomPage();
        custom_btn.addEventListener('click', () => {
            speed = valueHolder.value;
            console.log(speed + 'yoo');
            showGame(button_parent);
            return speed;
        })
    }
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

function addIt(element, secondElement, displayType){
    addAnimation(element, 'endAnimation');

    setTimeout(() => {
        addDisplay(element, 'none');
        addAnimation(secondElement, 'startAnimation');
        addDisplay(secondElement, displayType);
    }, 1000);
}


function showDifficulty(){
    addIt(reload_game, button_parent, 'grid');
}

function showGame(element){
    addIt(element, main_component, 'flex');
}

function replayMenu(){
    addIt(main_component, reload_game, 'grid');
}

function showCustomPage(){
    addIt(button_parent, custom_page, 'flex');
}

same_game.addEventListener('click', () => {
    showGame(reload_game);
    the_button.click();
});

change_game.addEventListener('click', () => {
    showDifficulty();
});

function addAnimation(element, theAnimation){
    element.className = theAnimation;
}

function addDisplay(element, theDisplay){
    element.style.display = theDisplay;
}