let current_score = document.querySelector('#current_score');
let prev_score = document.querySelector('#prev_score');

let easy_top_score = document.querySelector('#easy_top_score');
let intermediate_top_score = document.querySelector('#intermediate_top_score');
let hard_top_score = document.querySelector('#hard_top_score');
let legendary_top_score = document.querySelector('#legendary_top_score');
let custom_top_score = document.querySelector('#custom_top_score');

let top_score;

let allSpecialScores = document.querySelectorAll('.special_score');

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
    top_score = checkID(btn.id.split('_')[0]);
    displayTopScore();
}

function displayTopScore(){
    allSpecialScores.forEach(score => {
        score.style.display = 'none';
    })

    if(localStorage.getItem(top_score.id) != null){
        top_score.textContent = localStorage.getItem(top_score.id);
    }

    top_score.parentNode.style.display = 'block'; // parent e bejme qe me marr <p> e jo span
}

function checkID(id){
    switch(id){
        case 'easy':
            return easy_top_score;
        case 'intermediate':
            return intermediate_top_score;
        case 'hard':
            return hard_top_score;
        case 'legendary':
            return legendary_top_score;
        case 'custom':
            return custom_top_score;
    }
}