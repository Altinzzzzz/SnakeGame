import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js';

let food = getRandom();
let expansion_rate = 1;

export function update(score){
    if(onSnake(food)){
        expandSnake(expansion_rate);
        food = getRandom();
        score.textContent = +score.textContent + 1;
    }
}

export function draw(game_board){
    let element = document.createElement('div');
    element.style.gridColumnStart = food.x;
    element.style.gridRowStart = food.y;
    element.className = 'food';
    game_board.appendChild(element);
}

function getRandom(){
    let newFoodPosition = null;
    while (newFoodPosition == null || onSnake(newFoodPosition)){
        newFoodPosition = randomGridPosition();
    }
    return newFoodPosition;
}