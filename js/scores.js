let current_score = document.querySelector('#current_score');
let prev_score = document.querySelector('#prev_score');

let easy_top_score = document.querySelector('#easy_top_score');
let intermediate_top_score = document.querySelector('#intermediate_top_score');
let hard_top_score = document.querySelector('#hard_top_score');
let legendary_top_score = document.querySelector('#legendary_top_score');
let custom_top_score = document.querySelector('#custom_top_score');
let half_minute_top_score = document.querySelector('#half_minute_top_score');
let full_minute_top_score = document.querySelector('#full_minute_top_score');

export let timerLocation = document.querySelector('#timer');
let allSpecialScores = document.querySelectorAll('.special_score');

let top_score, duration;

export function updateScore(){
    current_score.textContent = +current_score.textContent + 1;
}

export function showFinalScore(){
    if(+top_score.textContent < +current_score.textContent){
        localStorage.setItem(top_score.id, current_score.textContent);
        top_score.textContent = current_score.textContent;
    }

    prev_score.textContent = current_score.textContent;
    current_score.textContent = 0;
}

export function putCorrectTopScore(btn){
    [top_score, duration] = checkID(btn.id.split('_')[0]);
    displayTopScore(duration);
    return duration;
}

function displayTopScore(duration){
    allSpecialScores.forEach(score => {
        score.style.display = 'none';
    })

    if(localStorage.getItem(top_score.id) != null){
        top_score.textContent = localStorage.getItem(top_score.id);
    }
    
    if(duration != undefined){
        timerLocation.style.display = 'block';
    } else {
        timerLocation.style.display = 'none';
    }

    top_score.parentNode.style.display = 'block'; // parent e bejme qe me marr <p> e jo span
}

function checkID(id){
    switch(id){
        case 'easy':
            return [easy_top_score, '5'];
        case 'intermediate':
            return [intermediate_top_score];
        case 'hard':
            return [hard_top_score];
        case 'legendary':
            return [legendary_top_score];
        case 'custom':
            return [custom_top_score];
        case 'half':
            return [half_minute_top_score, '30'];
        case 'full':
            return [full_minute_top_score, '60'];
        case 'y':
            return;
    }
}