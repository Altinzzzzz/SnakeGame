import { onSnake, expandSnake } from './snake.js';
import { getNewFoodPosition } from './grid.js';
import { updateScore } from './scores.js';

let foodContainer = [];
let expansion_rate = 1;
let food_amount = 1;

export function update(){
    updateFoodContainer()
    for(let i = 0; i < foodContainer.length; i++){
        if(onSnake(foodContainer[i])){
            foodContainer.splice(i, 1);
            expandSnake(expansion_rate);
            updateFoodContainer();
            updateScore();
        }
    }
}

export function draw(game_board){
    for(let i = 0; i < foodContainer.length; i++){
        let element = document.createElement('div');
        element.style.gridColumnStart = foodContainer[i].x;
        element.style.gridRowStart = foodContainer[i].y;
        element.className = 'food';
        game_board.appendChild(element);
    }
}

function updateFoodContainer(){
    for(let i = 0; i < food_amount - foodContainer.length; i++){
        let current_food = getNewFoodPosition();
        if(!onSnake(current_food)){
            foodContainer.push(getNewFoodPosition());
        } else {
            i--;
        }
    }
}

export function setFood(amount){
    foodContainer = [];
    food_amount = amount;
}
