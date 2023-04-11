import {getDirection} from './inputDirection.js';

export function setSpeed(classNr){
    switch(classNr){
        case '1':
            return 4;
        case '2':
            return 8;
        case '3':
            return 12;
        case '4':
            return 25;
    }
};

let segments = 0;
let snake_body = [{x: 11, y: 11}];

export function update(){
    addSegments(); // declare this here so that it has time to refresh
    // if we put it below expand snake, it shows the error 
    // because the head of the snake moves after we've added the segments
    // so it doesnt show a colllision
    const direction = getDirection();
    for(let i = snake_body.length - 2; i >= 0; i--){
        snake_body[i+1] = { ...snake_body[i]}
    }

    snake_body[0].x += direction.x;
    snake_body[0].y += direction.y;
}

export function draw(game_board){
    snake_body.forEach(snake_part => {
        let element = document.createElement('div');
        element.style.gridColumnStart = snake_part.x;
        element.style.gridRowStart = snake_part.y;
        element.className = 'snake';
        game_board.appendChild(element);
    });
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snake_body.some((snake_part, index) => {
        if(ignoreHead && index === 0) return false;
        return equalsPos(snake_part, position);
    })
}

export function expandSnake(expansion_rate){
    segments += expansion_rate;
}

export function addSegments(){
    for(let i = 0; i < segments; i++){
        snake_body.push({ ...snake_body[snake_body.length - 1] });
        // doesn't iterate without ...
    }

    segments = 0;
}

function equalsPos(p1, p2){
    return p1.x == p2.x && p1.y == p2.y;
}

export function getSnakeTop(){
    return snake_body[0];
}

export function snakeCollision(){
    return onSnake(snake_body[0], { ignoreHead: true });
}

export function resetSnake(){
    snake_body = [{x: 11, y: 11}];
}