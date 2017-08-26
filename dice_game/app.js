/*
GAME RULES:

- 2 player game / application
- Each turn, a player rolls a dice as many times as they wish. Each result is added to the round score
- If player rolls a 1, all his ROUND score gets is erased. Next players turn
- Player can 'Hold', which means that the ROUND score gets added to their GLOBAL score. 
- The first player to reach 100 points wins the game

*/

var scores, roundScore, activePlayer;

initGame(); // initialize game

// EVENT HANDLER for dice roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    // generate random number
    var diceNum = Math.floor(Math.random() * 6) + 1;
    
    // display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'imgs/dice-' + diceNum + '.png';
    
    if(diceNum !== 1) { // update round score ONLY IF the rolled number was not 1
        roundScore += diceNum; // add score
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
        switchPlayer(); // change players
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    // add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore; 
    
    // update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // check if player has won the game
    if(scores[activePlayer] >= 40) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        hideDice();
    } else {
        switchPlayer();
    }
});

function switchPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // roll 1, opponent becomes active player; round score to 0
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // toggle active class when switching
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //hide dice again when player rolls a 1
    hideDice();
}

function hideDice() {
    document.querySelector('.dice').style.display = 'none';    
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    hideDice(); // hides the dice on game load
    
    //sets scores to 0 initially
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}


//document.querySelector('.player-0-panel').classList.remove('active');
//document.querySelector('.player-1-panel').classList.toggle('active');
// var x = document.querySelector('#score-0').textContent;
// console.log(x);