import { setAndStart, button_parent, special_button_parent } from "./mainLogic.js";
import { putCorrectTopScore } from "./scores.js";
import { normalGameLogic } from "./startEndGame.js";
import { showGamemode } from './sections.js';

let main_component = document.querySelector('main');
let gamemode_parent = document.querySelector('#choose_gamemode_type');
let normal_gamemode = document.querySelector('#normal_gamemode_btn');
let special_gamemode = document.querySelector('#special_gamemode_btn');

export function chooseGamemode(){
    normal_gamemode.addEventListener('click', () => {
        showGamemode(gamemode_parent, button_parent);
        initializeNormalModes();
    })
    
    special_gamemode.addEventListener('click', () => {
        showGamemode(gamemode_parent, special_button_parent);
        initializeSpecialModes();
    });
}

function initializeNormalModes(){
    console.log(button_parent);
    for(let btn of button_parent.children){
        btn.addEventListener('click', (event) => {
            putCorrectTopScore(event.target);
            normalGameLogic(event.target).then(([speed, food]) => {
                setAndStart(speed, food);
            })
        })
    }
}

function initializeSpecialModes(){
    for(let btn of special_button_parent.children){
        btn.addEventListener('click', (event) => {
            // startGame(event.target).then())
        })
    }
}