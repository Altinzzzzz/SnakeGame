let input_direction = {x: 0, y: 0};
let last_input_direction = {x: 0, y: 0};


window.addEventListener('keydown', e => {
    switch(e.key){
        case 'ArrowUp':
            if(last_input_direction.y !== 0) break;
            input_direction = {x: 0, y: -1}
            break;
        case 'ArrowDown':
            if(last_input_direction.y !== 0) break;
            input_direction = {x: 0, y: 1}
            break;
        case 'ArrowLeft':
            if(last_input_direction.x !== 0) break;
            input_direction = {x: -1, y: 0}
            break;
        case 'ArrowRight':
            if(last_input_direction.x !== 0) break;
            input_direction = {x: 1, y: 0}
            break;
    }
    last_input_direction = input_direction;
});

export function getDirection(){
    last_input_direction = input_direction;
    return input_direction;
}

export function resetDirection(){
    input_direction = {x: 0, y: 0}
    last_input_direction = input_direction;
}