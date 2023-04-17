let GRID_SIZE = 21;

export function getNewFoodPosition(){
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    }
}

export function checkBorder(snake_head){
    return (
        snake_head.x <= 0 || 
        snake_head.x > 21 ||
        snake_head.y <= 0 ||
        snake_head.y > 21
    )
}