export function showGamemode(gamemodes_parent, gamemode_chosen){
    addIt(gamemodes_parent, gamemode_chosen, 'grid');
}

export function showDifficulty(section, button_parent){
    addIt(section, button_parent, 'grid');
}

export function showGame(element, main_game){
    addIt(element, main_game, 'flex');
}

export function replayMenu(main_game, reload_game){
    addIt(main_game, reload_game, 'grid');
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