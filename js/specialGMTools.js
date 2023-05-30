import { switchTimer } from './normalGames.js';
import { timerLocation } from './scores.js';
import { hasFoodBeenAdded } from './food.js';

let time_to_add = 5, game_over;

export function setTimer(duration){
    switchTimer(false);
    var timer = duration, minutes, seconds;
    var countdown = setInterval(function () {
        if (--timer < 0 || game_over == true) {
            clearInterval(countdown);
            switchTimer(true);
            timerLocation.textContent = "Timer ended";
            return;
        }

        if(hasFoodBeenAdded()) timer += time_to_add;
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
    
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        timerLocation.textContent = minutes + ":" + seconds;
    }, 1000);
}

export function isGameOver(val){
    game_over = val;
}