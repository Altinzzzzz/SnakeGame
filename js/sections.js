export function showDifficulty(reload_game, button_parent){
    addIt(reload_game, button_parent, 'grid');
}

export function showGame(element, main_component){
    addIt(element, main_component, 'flex');
}

export function replayMenu(main_component, reload_game){
    addIt(main_component, reload_game, 'grid');
}

export function showCustomPage(button_parent, custom_page){
    addIt(button_parent, custom_page, 'flex');
}

export function addIt(element, secondElement, displayType){
    addAnimation(element, 'endAnimation');
    setTimeout(() => {
        addDisplay(element, 'none');
        addAnimation(secondElement, 'startAnimation');
        addDisplay(secondElement, displayType);
    }, 1000);
}

function addAnimation(element, theAnimation){
    element.className = theAnimation;
}

function addDisplay(element, theDisplay){
    element.style.display = theDisplay;
}